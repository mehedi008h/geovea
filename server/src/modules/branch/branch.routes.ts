import { Router } from "express";
import { branchController } from "./branch.module";

const branchRoutes = Router();

branchRoutes.post("/", branchController.createBranch);
branchRoutes.get("/all", branchController.getAllBranch);
branchRoutes
    .route("/:branchId")
    .get(branchController.getBranch)
    .patch(branchController.updateBranch)
    .delete(branchController.deleteBranch);

export default branchRoutes;
