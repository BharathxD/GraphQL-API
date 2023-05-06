import fs from "fs";
import path from "path";
import logger from "./logger.util";

const certsDir = path.join(__dirname, "..", "..", "certs");

let publicKey: Buffer;
let privateKey: Buffer;

try {
  publicKey = fs.readFileSync(path.join(certsDir, "public_key.pem"));
  privateKey = fs.readFileSync(path.join(certsDir, "private_key.pem"));
} catch (error: any) {
  logger.error(`Failed to read the certification files: ${error}}`);
  process.exit(1);
}

export { publicKey, privateKey };
