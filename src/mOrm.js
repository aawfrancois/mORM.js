import { isEmpty } from "lodash";
import { existsSync } from "fs";
import PostgreSQL from "./engine/postgresql";
//import MySQL from "./engine/mysql";
//import SQLite from "./engine/sqlite";
import Student from "./entities/student";
import Project from "./entities/project";
import Note from "./entities/note";
export default class mOrm {
  configPathName = "./mOrm.config.js";

  classes = {
    Student,
    Project,
    Note
  };

  db = {
    PostgreSQL
    //MySQL,
    //SQLite
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
          entities: { Student, Project, Note }
        });
      }
    }

    const { type } = this.config;
    this.dbInstance = new this.db[type](this.config);
    for (const key in this.classes) {
      this.classes[key].dbInstance = this.dbInstance;
    }
    await this.dbInstance.initialize();
  }

  getEntity(name) {
    return new this.classes[name](this.dbInstance, name);
  }

  getDbContext() {
    return this.classes;
  }
}
