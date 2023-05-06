import { Arg, Ctx, Mutation, Authorized } from "type-graphql";
import Product, { CreateProductInput } from "../schema/product.schema";
import ProductService from "../services/product.service";
import Context from "../types/context.types";

export default class ProductResolver {
    private productService: ProductService;
    constructor() {
        this.productService = new ProductService();
    }
    @Authorized()
    @Mutation(() => Product)
    async createProduct(
        @Arg("input") input: CreateProductInput,
        @Ctx() context: Context
    ) {
        const user = context.user!;
        return this.productService.createProduct({ ...input, user: user._id });
    }
}
