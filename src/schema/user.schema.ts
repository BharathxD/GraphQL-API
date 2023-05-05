import { Prop, getModelForClass, pre } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import argon2 from "argon2";

@pre<User>("save", async function (this, next) {
  if (this.isModified("password")) {
    const hash = await argon2.hash(this.password);
    this.password = hash;
  }
  return next();
})
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;
  //? Name
  @Field(() => String)
  @Prop({ required: true, type: String })
  name: string;
  //? Username
  @Field(() => String)
  @Prop({ type: String })
  username: string;
  //? Email
  @Field(() => String)
  @Prop({ required: true, type: String })
  email: string;
  //? Password
  @Prop({ required: true, type: String })
  password: string;
  public async comparePassword(password: string): Promise<boolean> {
    const isValid = await argon2.verify(this.password, password);
    return isValid;
  }
}

export const UserModel = getModelForClass(User);

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
