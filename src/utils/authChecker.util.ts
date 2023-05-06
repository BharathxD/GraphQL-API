import { AuthChecker } from "type-graphql";
import Context from "../types/context.types";

const authChecker: AuthChecker<Context> = ({ root, args, context, info }) => {
  //? Return `user` if exists or return `false` if not
  return !!context.user;
};

export default authChecker;
