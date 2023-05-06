import Context from "../../../types/context.types";
import JwtService from "../../../utils/jwt.util";

const context = (context: Context): Context => {
  const { cookies } = context.req;
  const accessToken = cookies?.accessToken || null;
  if (!accessToken) return context;
  const jwtService = new JwtService();
  const user = jwtService.verifyToken(accessToken);
  const updatedCtx = { ...context, user };
  return updatedCtx;
};

export default context;
