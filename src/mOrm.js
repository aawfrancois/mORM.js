import { isEmpty } from 'lodash'
import { existsSync } from 'fs'

export default class mOrm {
  configPathName = "./mOrm.config.js";

  async createConnection(dbConfig = {}) {
    if (typeof dbConfig == 'string') {
      // Postgres://user:password:port/db
      //string => object
    } else {
      if (isEmpty(dbConfig)) {
        if(!existsSync(this.configPathName)) {
          throw new Error('NO CONFIG')
        }

        this.config = require (this.configPathName)
      } else {
        this.config = dbConfig
      }
    }

    const {type , host, port, username, pass} = this.config

    switch (type) {
      case 'postgres':
        this.dbInstance = new PostgresSQL({ host, port, username, pass})
        break
    }
  }
}
