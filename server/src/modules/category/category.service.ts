import { CategoryDto } from "../../common/interface/product.interface";
import { NotFoundException } from "../../common/utils/catch-errors";
import { logger } from "../../common/utils/logger";
import { Category } from "../../database/models";

export class CategoryService {
    // create new category
    public async newCategory(categoryData: CategoryDto) {
        logger.info(`Create category for: ${categoryData.name}`);

        // create new category
        const category = new Category({
            name: categoryData.name,
            image: {
                public_id: categoryData.image.public_id,
                url: categoryData.image.url,
            },
        });

        await category.save();

        logger.info(`Category created successfully : ${category._id}`);
        return {
            category,
        };
    }

    // get all category
    public async findAll() {
        const categorys = await Category.find();
        return {
            categorys,
        };
    }

    // get category details
    public async findCategory(categoryId: string) {
        const category = await Category.findById(categoryId);

        // throw exception if category not found
        if (!category) {
            throw new NotFoundException("Category not found");
        }
        return {
            category,
        };
    }

    // delete category
    public async deleteById(categoryId: string) {
        const category = await Category.findById(categoryId);

        // throw exception if category not found
        if (!category) {
            throw new NotFoundException("Category not found");
        }

        // delete category
        await category.deleteOne();
    }

    // update category
    public async update(categoryId: string, categoryData: CategoryDto) {
        const category = await Category.findById(categoryId);

        // throw exception if category not found
        if (!category) {
            throw new NotFoundException("Category not found");
        }

        // update category
        (category.name = categoryData.name),
            (category.image = {
                public_id: categoryData.image.public_id,
                url: categoryData.image.url,
            }),
            await category.save();

        logger.info(`Category update successfully : ${category._id}`);
        return {
            category,
        };
    }
}
