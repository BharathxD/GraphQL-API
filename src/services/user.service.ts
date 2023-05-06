import { ApolloError } from "apollo-server";
import { LoginInput, UserModel } from "../schema/user.schema";
import Context from "../types/context.types";

export default class UserService {
  async createUser(input: any) {
    return UserModel.create(input);
  }
  async validateUser(input: LoginInput, context: Context) {
    const validationError = "Invalid email or password";
    const user = await UserModel.find().findByEmail(input.email).lean();
    //? Check if user exists in the database
    if (!user) {
      throw new ApolloError(validationError);
    }
    //? Validate user password
    const passwordIsValid = await user.comparePassword(input.password);
    if (!passwordIsValid) {
      throw new ApolloError(validationError);
    }
  }
}
