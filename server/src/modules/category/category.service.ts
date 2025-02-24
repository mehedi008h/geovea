import { v2 as cloudinary } from "cloudinary";
import { CategoryDto } from "../../common/interface/product.interface";
import { NotFoundException } from "../../common/utils/catch-errors";
import { logger } from "../../common/utils/logger";
import { Category } from "../../database/models";

export class CategoryService {
    // create new category
    public async newCategory(categoryData: CategoryDto) {
        logger.info(`Create category for: ${categoryData.name}`);

        let imageData = null;

        if (categoryData.image) {
            const uploadResponse = await this.uploadPhoto(categoryData.image);

            if (!uploadResponse || !uploadResponse.result) {
                throw new Error("Image upload failed.");
            }

            imageData = {
                public_id: uploadResponse.result.public_id,
                url: uploadResponse.result.secure_url,
            };
        }

        // create new category
        const category = new Category({
            name: categoryData.name,
            description: categoryData.description,
            image: imageData,
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

        const {
            result: { public_id, secure_url },
        } = await this.uploadPhoto(categoryData.image);

        // update category
        (category.name = categoryData.name),
            (category.image = {
                public_id: public_id,
                url: secure_url,
            }),
            await category.save();

        logger.info(`Category update successfully : ${category._id}`);
        return {
            category,
        };
    }

    // upload photo to cloudinary
    public async uploadPhoto(photo: any) {
        const result = await cloudinary.uploader.upload(photo, {
            folder: "geovea/category",
            width: 300,
            hight: 200,
            crop: "scale",
        });

        return {
            result,
        };
    }
}
