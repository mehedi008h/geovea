import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { ProductService } from "./product.service";
import { productSchema } from "../../common/validators/product.validator";
import { HTTPSTATUS } from "../../config/http.config";

export class ProductController {
    private productService = new ProductService();

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    // create a new product
    public createProduct = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            // validate request body
            const body = productSchema.parse(req.body);

            const product = await this.productService.create(body);

            // return success response
            return res.status(HTTPSTATUS.CREATED).json({
                message: "Product Created successfully",
                product,
            });
        }
    );

    // get all product
    public getAllProduct = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const products = await this.productService.findAll();

            // return success response
            return res.status(HTTPSTATUS.OK).json({
                message: "Get all Product Successfully",
                products,
            });
        }
    );

    // get product details
    public getProduct = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const { productId } = req.params;
            const product = await this.productService.findProduct(productId);

            // return success response
            return res.status(HTTPSTATUS.OK).json({
                message: "Get Product Details Successfully",
                product,
            });
        }
    );

    // delete product
    public deleteProduct = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const { productId } = req.params;
            await this.productService.deleteById(productId);

            // return success response
            return res.status(HTTPSTATUS.OK).json({
                message: "Product Deleted Successfully",
            });
        }
    );

    // update product
    public updateProduct = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const { productId } = req.params;
            // validate request body
            const body = productSchema.parse(req.body);

            const product = await this.productService.update(productId, body);

            // return success response
            return res.status(HTTPSTATUS.OK).json({
                message: "Product Updated Successfully",
                product,
            });
        }
    );

    // find products by category id
    public getProductsByCategoryId = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const { categoryId } = req.params;

            const products = await this.productService.findProductsByCategory(
                categoryId
            );

            // return success response
            return res.status(HTTPSTATUS.OK).json({
                message: "Get all Product Successfully",
                products,
            });
        }
    );
}
