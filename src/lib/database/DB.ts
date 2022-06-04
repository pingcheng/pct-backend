import mysql, { Connection } from "mysql2/promise";

export default class DB {

    private static connection: Connection = null;

    private static async createConnection() {
        if (this.connection === null) {

            const config = {
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT) || 3306,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            };

            console.log("Try to connect to this database ", {
                host: config.host,
                port: config.port,
                user: config.user,
                password: "[HIDDEN]",
                database: config.database,
            });

            try {
                this.connection = await mysql.createConnection(config);
                this.connection.config.namedPlaceholders = true;
            } catch (e) {
                console.log("Failed to connect database with config ", {
                    host: config.host,
                    port: config.port,
                    user: config.user,
                    password: "[HIDDEN]",
                    database: config.database,
                });
            }
        }
    }

    /**
     * Get a database connection.
     */
    public static async getConnection() {
        if (this.connection === null) {
            await this.createConnection();
        }

        return this.connection;
    }

    public static async query(query: string, params: Array<string|number>|Record<string, any> = []): Promise<Array<Record<string, any>>> {
        const db = await this.getConnection();
        const result = await db.query(query, params);

        return result[0] as Array<Record<string, any>>;
    }

}