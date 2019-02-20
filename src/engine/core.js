export default class Core {
  constructor({
    host = "",
    port = "",
    username = "",
    password = "",
    database = "",
    synchronize = false,
    entities = []
  } = {}) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.database = database;
    this.synchronize = synchronize;
    this.entities = entities;
  }
  dump(is_uri = false) {
    console.log(`Database informations :
    host: ${this.host}
    port: ${this.port}
    username: ${this.username}
    password: ${this.password}
    database: ${this.database}
    is_uri: ${is_uri}
    `);
  }
}
