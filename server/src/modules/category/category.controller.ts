import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { HTTPSTATUS } from "../../config/http.config";
import { CategoryService } from "./category.service";
import { categorySchema } from "../../common/validators/product.validator";

export class CategoryController {
    private categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
    }

    // create a new category
    public createCategory = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            // validate request body
            const body = categorySchema.parse(req.body);

            await this.categoryService.newCategory(body);

            // return success response
            return res.status(HTTPSTATUS.CREATED).json({
                message: "Category Created successfully",
            });
        }
    );
}
