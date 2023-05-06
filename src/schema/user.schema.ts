import {
  Prop,
  getModelForClass,
  index,
  pre,
  queryMethod,
} from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import argon2 from "argon2";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User["email"]
) {
  return this.findOne({ email });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

@pre<User>("save", async function (this, next) {
  if (this.isModified("password")) {
    const hash = await argon2.hash(this.password);
    this.password = hash;
  }
  return next();
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;
  //? Name
  @Field(() => String)
  @Prop({ required: true, type: String })
  name: string;
  //? Email
  @Field(() => String)
  @Prop({ required: true, unique: true, type: String })
  email: string;
  //? Password
  @Prop({ required: true, type: String })
  password: string;
  public async comparePassword(password: string): Promise<boolean> {
    const isValid = await argon2.verify(this.password, password);
    return isValid;
  }
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;
  @IsEmail()
  @Field(() => String)
  email: string;
  @Field(() => String)
  @MinLength(6, { message: "Password must be atleast 6 characters long" })
  @MaxLength(50, { message: "Password must not be longer than 50 characters" })
  password: string;
}

@InputType()
export class LoginInput {
  @IsEmail()
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}
