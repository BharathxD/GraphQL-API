import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "./user.schema";
import { Index, Prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { randomUUID } from "crypto";
import { IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";
import { isString } from "lodash";

@ObjectType()
@Index({ product: 1 })
export default class Product {
  @Field(() => String)
  _id: string;
  @Field(() => User)
  @Prop({ require: true, ref: () => User })
  user: Ref<User>;
  @Field(() => String)
  @Prop({ required: true })
  name: string;
  @Field(() => String)
  @Prop({ required: true })
  description: string;
  @Field(() => Number)
  @Prop({ required: true })
  price: number;
  @Field(() => String)
  @Prop({
    required: true,
    default: () => `product_${randomUUID()}`,
    unique: true,
  })
  productId: string;
}

export const ProductModel = getModelForClass<typeof Product>(Product);

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  @MinLength(50, { message: "The description must be 60 characters long" })
  @MaxLength(150, {
    message: "The description must not exceed 150 characters length",
  })
  description: string;
  @Field(() => Number)
  @IsNumber()
  @Min(1)
  price: number;
}

@InputType()
export class GetProductInput {
  @Field()
  //? Include this decorator, else the server will throw Argument Validation Error
  @IsString()
  productId: string;
}
