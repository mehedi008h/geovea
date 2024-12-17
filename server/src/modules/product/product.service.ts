import mongoose from "mongoose";
import { ProductDto } from "../../common/interface/product.interface";
import { NotFoundException } from "../../common/utils/catch-errors";
import { logger } from "../../common/utils/logger";
import { Category, Product } from "../../database/models";

export class ProductService {
    // create new product
    public async create(productData: ProductDto) {
        logger.info(`Create category for: ${productData.name}`);

        // check category exists
        const category = await Category.findById(productData.category);

        // throw exception if category not found
        if (!category) {
            throw new NotFoundException("Category not found");
        }

        let imagesLinks = [];

        for (let i = 0; i < productData.images.length; i++) {
            imagesLinks.push({
                public_id: "",
                url: "",
            });
        }

        // create new product
        const product = new Product({
            name: productData.name,
            images: imagesLinks,
            price: productData.price,
            discountPrice: productData.discountPrice || 0, // Default to 0 if no discount
            quantity: productData.quantity || 0, // Default to 0 if no quantity
            category: new mongoose.Types.ObjectId(productData.category),
        });

        await product.save();

        logger.info(`Product created successfully : ${product._id}`);
        return {
            product,
        };
    }

    // get all product
    public async findAll() {
        const products = await Product.find();
        return {
            products,
        };
    }

    // get product details
    public async findProduct(productId: string) {
        const product = await Product.findById(productId);

        // throw exception if product not found
        if (!product) {
            throw new NotFoundException("Product not found");
        }
        return {
            product,
        };
    }

    // delete product
    public async deleteById(productId: string) {
        const product = await Product.findById(productId);

        // throw exception if product not found
        if (!product) {
            throw new NotFoundException("Product not found");
        }

        // delete category
        await product.deleteOne();
    }

    // update product
    public async update(productId: string, productData: ProductDto) {
        const product = await Product.findById(productId);

        // throw exception if product not found
        if (!product) {
            throw new NotFoundException("Product not found");
        }

        // check category exists
        const category = await Category.findById(productData.category);

        // throw exception if category not found
        if (!category) {
            throw new NotFoundException("Category not found");
        }

        let imagesLinks = [];

        for (let i = 0; i < productData.images.length; i++) {
            imagesLinks.push({
                public_id: "",
                url: "",
            });
        }

        // update product
        (product.name = productData.name),
            (product.price = productData.price),
            (product.discountPrice = productData.discountPrice || 0), // Default to 0 if no discount
            (product.quantity = productData.quantity), // Default to 0 if no quantity
            (product.category = new mongoose.Types.ObjectId(
                productData.category
            )), // Default to
            await product.save();

        logger.info(`Product update successfully : ${product._id}`);
        return {
            product,
        };
    }

    // get products by category
    public async findProductsByCategory(categoryId: string) {
        // find category
        const category = await Category.findById(categoryId);

        // throw exception if product not found
        if (!category) {
            throw new NotFoundException("Category not found");
        }
        // find products by category
        const products = await Product.find({
            category: category._id,
        })
            .select("-category")
            .exec();
        return {
            products,
        };
    }
}
