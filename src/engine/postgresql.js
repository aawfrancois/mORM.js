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
      if (synchronize) {
        for (const key in object) {
          await this.client.query(`DELETE FROM ${key}`);
        }
      }
    } catch (ex) {
      throw new Error(`Databse ${host} doesn't exist`);
    }
  }
}
