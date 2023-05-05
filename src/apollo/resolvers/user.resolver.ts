import { Query } from "type-graphql";

export default class UserResolver {
    @Query()
    me() {
        return {
            _id: "123",
            name: "Sample Name",
            email: "sample"
        }
    }
}