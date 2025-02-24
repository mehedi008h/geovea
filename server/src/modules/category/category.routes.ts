import { Router } from "express";
import { categoryController } from "./category.module";

const categoryRoutes = Router();

categoryRoutes.post("/", categoryController.createCategory);
categoryRoutes.get("/all", categoryController.getAllCategory);
categoryRoutes
    .route("/:categoryId")
    .get(categoryController.getCategory)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

export default categoryRoutes;
