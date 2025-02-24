import { Router } from "express";
import { productController } from "./product.module";

const productRoutes = Router();

productRoutes.post("/", productController.createProduct);
productRoutes.get("/all", productController.getAllProduct);
productRoutes
    .route("/:productId")
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

productRoutes.get(
    "/category/:categoryId",
    productController.getProductsByCategoryId
);

export default productRoutes;
