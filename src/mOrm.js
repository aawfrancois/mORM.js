import { isEmpty } from "lodash";
import { existsSync } from "fs";
import PostgreSQL from "./engine/PostgreSQL";
import Student from "./entities/student";
import Project from "./entities/project";
export default class mOrm {
  configPathName = "./mOrm.config.js";

  classes = {
    Student
  };

  async createConnection(dbConfig = {}) {
    if (typeof dbConfig == "string") {
      // Postgres://user:password:port/db
      //string => object
    } else {
      if (isEmpty(dbConfig)) {
        if (!existsSync(this.configPathName)) {
          throw new Error("NO CONFIG");
        }

        this.config = require(this.configPathName);
      } else {
        this.config = Object.assign(dbConfig, {
          synchronize: true,
          entities: [Student, Project]
        });
      }
    }

    const {
      type,
      host,
      port,
      username,
      pass,
      synchronize,
      entities,
      database
    } = this.config;

    switch (type) {
      case "postgres":
        this.dbInstance = new PostgreSQL({
          host,
          port,
          username,
          pass,
          database,
          synchronize,
          entities
        });
        break;
    }
  }

  getEntity(name) {
    return new this.classes[name](this.dbInstance,name);
  }
}
