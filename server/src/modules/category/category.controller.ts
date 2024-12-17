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

            const category = await this.categoryService.newCategory(body);

            // return success response
            return res.status(HTTPSTATUS.CREATED).json({
                message: "Category Created successfully",
                category,
            });
        }
    );

    // get all category
    public getAllCategory = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const categorys = await this.categoryService.findAll();

            // return success response
            return res.status(HTTPSTATUS.OK).json({
                message: "Gat all category successfully",
                categorys,
            });
        }
    );

    // get category details
    public getCategory = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            // get category id from params
            const { categoryId } = req.params;

            const category = await this.categoryService.findCategory(
                categoryId
            );

            // return success response
            return res.status(HTTPSTATUS.OK).json({
                message: "Gat category details successfully",
                category,
            });
        }
    );

    // delete category
    public deleteCategory = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            // get category id from params
            const { categoryId } = req.params;

            // delete category
            await this.categoryService.deleteById(categoryId);

            // return success response
            return res.status(HTTPSTATUS.OK).json({
                message: "Delete category successfully",
            });
        }
    );

    // update category
    public updateCategory = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            // get category id from params
            const { categoryId } = req.params;
            // validate request body
            const body = categorySchema.parse(req.body);

            // update category
            const category = await this.categoryService.update(
                categoryId,
                body
            );

            // return success response
            return res.status(HTTPSTATUS.OK).json({
                message: "Update category successfully",
                category,
            });
        }
    );
}
