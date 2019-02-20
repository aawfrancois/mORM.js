import { Client } from "pg";
import Core from "./core";

export default class PostgreSQL extends Core {
  constructor(options) {
    super(options);
  }

  async initialize() {
    const {
      host,
      port,
      username: user,
      password,
      database,
      synchronize,
      entities
    } = this;

    this.client = new Client({
      user,
      host,
      database,
      password,
      port
    });

    try {
      await this.client.connect();
      try {
        if (synchronize) {
          for (const key in entities) {
            console.log("Drop data: " + key);
            await this.client.query(`DELETE FROM ${key}`);
          }
        }
      } catch (error) {}
    } catch (ex) {
      console.log(ex.message);
      throw new Error(`Databse ${host} doesn't exist`);
    }
  }
}
