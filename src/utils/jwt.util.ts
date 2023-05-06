import jwt, {
    NotBeforeError,
    TokenExpiredError
} from "jsonwebtoken";
import { publicKey, privateKey } from "./pemToString.util";

type JwtPayload = String | Buffer | Object;

export default class JwtService {
    private readonly publicKey: string;
    private readonly privateKey: string;
    constructor() {
        try {
            this.publicKey = Buffer.from(publicKey).toString();
            this.privateKey = Buffer.from(privateKey).toString();
        } catch (error: any) {
            throw new Error(`Failed to load JWT Key files: ${error.message}.\nPlease generate a public and private key pair.`)
        }
    }
    generateToken(payload: JwtPayload): string {
        try {
            const expiresIn = process.env.EXPIRES_IN || "60m";
            const options: jwt.SignOptions = {
                algorithm: "RS256",
                expiresIn
            }
            return jwt.sign(payload, this.privateKey, options);
        } catch (error: any) {
            throw new Error(`Failed to generate jwt token: ${error.message}`);
        }
    }
    verifyToken(token: string): JwtPayload {
        try {
            const payload = jwt.verify(token, this.publicKey) as JwtPayload;
            return payload;
        } catch (error: any) {
            if (error instanceof NotBeforeError) {
                throw NotBeforeError;
            } else if (error instanceof TokenExpiredError) {
                throw TokenExpiredError;
            }
            else {
                throw new Error(`Failed to generate JWT Token: ${error.message}`);
            }
        }
    }
}