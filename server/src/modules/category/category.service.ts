import { CategoryDto } from "../../common/interface/product.interface";
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
}
