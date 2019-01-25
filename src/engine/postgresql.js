import { Client } from "pg";
import Core from "./core";

export default class PostgreSQL extends Core {
  constructor(options) {
    super(options);
    this.initialize()
  }

  async initialize() {
    const { host, port, username:user, password, database, synchronize, entities } = this;

    this.client = new Client({
      user,
      host,
      database,
      password,
      port,
    });

    try {
      await this.client.connect();
    } catch (ex) {
      throw new Error(`Databse ${host} doesn't exist`);
    }
  }
}
