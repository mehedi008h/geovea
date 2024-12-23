import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { branchSchema } from "../../common/validators/product.validator";
import { HTTPSTATUS } from "../../config/http.config";
import { BranchService } from "./branch.service";

export class BranchController {
    private branchService: BranchService;

    constructor(branchService: BranchService) {
        this.branchService = branchService;
    }

    // create new branch
    public createBranch = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            // validate request body
            const body = branchSchema.parse(req.body);

            const branch = await this.branchService.newBranch(body);

            // return success response
            return res.status(HTTPSTATUS.CREATED).json({
                message: "Branch Created successfully",
                branch,
            });
        }
    );

    // get all branch
    public getAllBranch = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const branchs = await this.branchService.findAll();

            // return success response
            return res.status(HTTPSTATUS.CREATED).json({
                message: "Get all Branch successfully",
                branchs,
            });
        }
    );

    // get branch details
    public getBranch = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const { branchId } = req.params;
            const branch = await this.branchService.findBranch(branchId);

            // return success response
            return res.status(HTTPSTATUS.CREATED).json({
                message: "Get Branch successfully",
                branch,
            });
        }
    );

    // update branch
    public updateBranch = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const { branchId } = req.params;
            const body = branchSchema.parse(req.body);
            const branch = await this.branchService.update(branchId, body);

            // return success response
            return res.status(HTTPSTATUS.CREATED).json({
                message: "Update Branch successfully",
                branch,
            });
        }
    );

    // delete branch
    public deleteBranch = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const { branchId } = req.params;

            await this.branchService.deleteById(branchId);

            // return success response
            return res.status(HTTPSTATUS.CREATED).json({
                message: "Delete Branch successfully",
            });
        }
    );
}
