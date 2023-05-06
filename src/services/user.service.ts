import { ApolloError } from "apollo-server";
import { LoginInput, UserModel } from "../schema/user.schema";
import Context from "../types/context.types";
import JwtService from "../utils/jwt.util";

export default class UserService {
  async createUser(input: any) {
    try {
      return UserModel.create(input);
    } catch (error: any) {
      if (error.name === "MongoError" && error.code === 11000) {
        //? Handle duplicate key error
        console.log("Email already exists.");
      } else {
        //? Handle other errors
        console.error(error);
      }
    }
  }
  async validateUser(input: LoginInput, context: Context) {
    const validationError = "Invalid email or password";
    const user = await UserModel.find().findByEmail(input.email);
    //? Check if user exists in the database
    if (!user) {
      throw new ApolloError(validationError);
    }
    //? Validate user password
    const passwordIsValid = await user.comparePassword(input.password);
    if (!passwordIsValid) {
      throw new ApolloError(validationError);
    }
    //? Generate JWT Token
    const jwt = new JwtService();
    const token = jwt.generateToken(user.toObject());
    context.res.cookie("accessToken", {
      maxAge: 3.154e10,
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    })
    return token;
  }
}
