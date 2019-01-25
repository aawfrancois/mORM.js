import Core from "./core"
import mysql from 'mysql'


export default class MySQL extends Core {
    constructor(options) {
        super(options);
    }

    async initialize() {

        const {host, username: user, password, database} = this;

        var connection = mysql.createConnection({
            host,
            user,
            password,
            database
        });

        try {
            await connection.connect();
        } catch (ex) {
            throw new Error(`Databse ${host} doesn't exist`);
        }
    }
}
