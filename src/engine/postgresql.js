import {client} from 'pg'

export default class PostgreSQL {
    constructor(options) {
        super(options)
    }

    async initialize() {
        const {host, port, username, password, database} = this

        this.client = new Client({
            user: username,
            host,
            database,
            password,
            port
        })

        try {
            await this.client.connect()
        } catch (ex) {
            throw new Error(`Databse ${host} doesn't exist`)

        }
    }
}
