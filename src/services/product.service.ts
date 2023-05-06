import { CreateProductInput, GetProductInput, ProductModel } from "../schema/product.service";
import { User } from "../schema/user.schema";

export default class ProductService {
    async createUser(input: CreateProductInput & { user: User["_id"] }) {
        return ProductModel.create(input);
    }
    async findProducts() {
        return ProductModel.find().lean();
    }
    async findSingleProduct(input: GetProductInput) {
        return ProductModel.findOne(input).lean();
    }
}