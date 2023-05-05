import { Prop, getModelForClass } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Field(() => String)
    _id: string
    //? Name
    @Field(() => String)
    @Prop({ required: true, type: String })
    name: string
    //? Username
    @Field(() => String)
    @Prop({ required: true, type: String })
    username: string
    //? Email
    @Field(() => String)
    @Prop({ required: true, type: String })
    email: string
    //? Password
    @Prop({ required: true, type: String })
    password: string
}

export const UserModel = getModelForClass(User);

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name: string
    @IsEmail()
    @Field(() => String)
    email: string
    @Field(() => String)
    @MinLength(6, { message: "Password must be atleast 6 characters long" })
    @MaxLength(50, { message: "Password must not be longer than 50 characters" })
    passwotrd: string
}