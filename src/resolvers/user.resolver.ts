import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { CreateUserInput, LoginInput, User } from "../schema/user.schema";
import UserService from "../services/user.service";
import Context from "../types/context.types";

export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String)
  loginUser(@Arg("input") input: LoginInput, @Ctx() context: Context) {
    return this.userService.validateUser(input, context);
  }

  @Query(() => User, { nullable: true })
  user(@Ctx() context: Context) {
    return context.user;
  }
}
