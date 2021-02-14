import mysql, { Connection } from "mysql2/promise";

export default class DB {

    private static connection: Connection = null;

    private static async createConnection() {
        if (this.connection === null) {

            const config = {
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            };

            try {
                this.connection = await mysql.createConnection(config);
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

    public static async query(query: string): Promise<Array<Record<string, any>>> {
        const db = await this.getConnection();
        const result = await db.query(query);

        return result[0] as Array<Record<string, any>>;
    }

}