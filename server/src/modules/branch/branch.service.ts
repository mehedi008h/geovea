import { BranchDto } from "../../common/interface/product.interface";
import { NotFoundException } from "../../common/utils/catch-errors";
import { logger } from "../../common/utils/logger";
import { Branch } from "../../database/models";

export class BranchService {
    // create new branch
    public async newBranch(branchData: BranchDto) {
        logger.info(`Create branch for: ${branchData.name}`);

        // create new branch
        const branch = new Branch({
            name: branchData.name,
            location: {
                latitude: branchData.location.latitude,
                longitude: branchData.location.longitude,
            },
            address: branchData.address,
            deliveryPartners: branchData.deliveryPartners,
        });

        await branch.save();

        logger.info(`Branch created successfully : ${branch._id}`);
        return {
            branch,
        };
    }

    // get all branch
    public async findAll() {
        const branches = await Branch.find();
        return {
            branches,
        };
    }

    // get branch details
    public async findBranch(branchId: string) {
        const branch = await Branch.findById(branchId);

        // throw exception if category not found
        if (!branch) {
            throw new NotFoundException("Branch not found");
        }
        return {
            branch,
        };
    }

    // delete branch
    public async deleteById(branchId: string) {
        const branch = await Branch.findById(branchId);

        // throw exception if category not found
        if (!branch) {
            throw new NotFoundException("Branch not found");
        }

        // delete branch
        await branch.deleteOne();
    }

    // update branch
    public async update(branchId: string, branchData: BranchDto) {
        const branch = await Branch.findById(branchId);

        // throw exception if branch not found
        if (!branch) {
            throw new NotFoundException("Branch not found");
        }

        // update branch
        (branch.name = branchData.name),
            (branch.address = branchData.address),
            (branch.location = {
                latitude: branchData.location.latitude,
                longitude: branchData.location.longitude,
            }),
            (branch.deliveryPartners = branchData.deliveryPartners);
        await branch.save();

        logger.info(`Branch update successfully : ${branch._id}`);
        return {
            branch,
        };
    }
}
