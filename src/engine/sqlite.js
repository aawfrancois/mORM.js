import Core from "./core"

const sqlite3 = require('sqlite3').verbose();

export default class SQLite extends Core {
    constructor(options) {
        super(options);
    }

    async initialize() {

        // open database in memory
        let db = new sqlite3.Database(':./chinook.db:', (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });

        // close the database connection
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}
