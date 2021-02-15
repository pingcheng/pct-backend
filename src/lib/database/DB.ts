import mysql, { Connection } from "mysql2/promise";

export default class DB {

    private static connection: Connection = null;

    private static async createConnection() {
        if (this.connection === null) {

            const config = {
                host: process.env.DB_HOST || "database-1.ctmfqhtpxyv2.ap-southeast-2.rds.amazonaws.com",
                user: process.env.DB_USERNAME || "admin",
                password: process.env.DB_PASSWORD || "c19910626",
                database: process.env.DB_NAME || "pingchengtech",
            };

            try {
                this.connection = await mysql.createConnection(config);
                this.connection.config.namedPlaceholders = true;
            } catch (e) {
                console.log("Failed to connect database with config ", config);
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