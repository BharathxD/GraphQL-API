import { Prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

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