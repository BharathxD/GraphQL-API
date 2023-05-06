import Context from "../../types/context.types";
import JwtService from "../../utils/jwt.util";

/**
 * This function extracts the access token from the request headers or cookies, verifies it using a JWT service, and adds the user information to the context object.
 * @param {Context} context - The `context` parameter is an object that contains information about the current request and response, such as the HTTP request and response objects, the URL, and any query parameters.
 * In this specific @returns The function `context` returns an updated context object that includes the user information decoded from the access token. If there is no access token, the original context object is returned.
 */

const context = (context: Context): Context => {
  const { cookies } = context.req;
  const { authorization } = context.req.headers;
  const accessToken = authorization || cookies?.accessToken || null;
  if (!accessToken) {
    return context;
  }
  const jwtService = new JwtService();
  const user = jwtService.verifyToken(accessToken);
  const updatedCtx = { ...context, user };
  return updatedCtx;
};

export default context;
