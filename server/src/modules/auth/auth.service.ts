import { CustomerLoginDto } from "../../common/interface/auth.interface";
import { generateToken } from "../../common/utils/jwt";
import { logger } from "../../common/utils/logger";
import { Customer } from "../../database/models";

export class AuthService {
    // customer login
    public async customerLogin(phone: string) {
        logger.info(`Customer Login attempt for phone: ${phone}`);

        // find customer
        let customer = await Customer.findOne({
            phone: phone,
        });

        // create customer
        if (!customer) {
            customer = new Customer({
                phone,
                role: "Customer",
            });

            await customer.save();
        }

        // generate tokens
        const { accessToken, refreshToken } = generateToken(customer);

        logger.info(`Login successful for customer ID: ${customer._id}`);
        return {
            customer,
            accessToken,
            refreshToken,
        };
    }
}
