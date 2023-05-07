import { Server, IncomingMessage, ServerResponse } from "http";
import Database from "./database.util";
import logger from "./logger.util";

const gracefulShutdown = (signal: string, server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
    process.once(signal, async () => {
        console.log(
            `\n🚨 Recieved ${signal} 🚨 \nImplementing graceful shutdown...`
        );
        try {
            await Promise.all([
                new Promise<void>((resolve, reject) => {
                    server.close((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    })
                }),
                await new Database().disconnect()
            ])
            console.log(`✅ Shutdown Completed ✅`);
            process.exit(0);
        } catch (error: any) {
            console.log(`❌ Something went wrong ❌ \n${error}`);
            process.exit(1);
        }
    })
}