export default class Entity {
  constructor(dbInstance, attributs = {}) {
    this.dbInstance = dbInstance;
    for (const key in attributs) {
      this[key] = attributs[key];
    }
  }

  static async exec(query) {
    try {
      const res = await this.dbInstance.client.query(query);
      return res.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async exec(query) {
    try {
      const res = await this.dbInstance.client.query(query);
      return res.rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async save(data) {
    const keys = [];
    const values = [];
    for (const key in data) {
      keys.push(key);
      values.push(`'${data[key]}'`);
    }
    const query = `INSERT INTO ${this.name} (${keys.join(
      ","
    )}) VALUES(${values.join(",")}) RETURNING *`;
    return new this(this.dbInstance, (await this.exec(query))[0]);
  }

  static async count() {
    const query = `SELECT COUNT(*) FROM ${this.name}`;
    return await this.exec(query);
  }

  static async findByPk(id, { attributes = ["*"] } = {}) {
    const query = `SELECT ${attributes.join(",")} FROM ${
      this.name
    } WHERE id = ${id}`;
    const res = await this.dbInstance.client.query(query);
    if (attributes[0] != "*") {
      return res.rows[0];
    }
    return new this(this.dbInstance, res.rows[0]);
  }

  static async findAll({ attributes = ["*"] } = {}) {
    const query = `SELECT ${attributes.join(",")} FROM ${this.name}`;
    const res = await this.exec(query);
    if (attributes[0] != "*") {
      return res.rows;
    }
    return res.map(data => new this(this.dbInstance, data));
  }

  static async findOne({ where = {}, attributes = ["*"] } = {}) {
    const conditions = [];
    for (const key in where) {
      conditions.push(`${key} = '${where[key]}'`);
    }
    const query = `SELECT ${attributes.join(",")} FROM ${this.name} ${
      conditions.length == 0 ? "" : "WHERE"
    } ${conditions.join("AND")} LIMIT 1`;
    const res = (await this.exec(query))[0];
    if (attributes[0] != "*") {
      return res;
    }
    return new this(this.dbInstance, res);
  }

  async update() {
    const pk = this.getPrimaryKey();
    const values = [];
    const meta = this.constructor.meta().columns;
    for (const key in meta) {
      if (meta[key].primary) {
        values.push(`${key} = '${this[key]}'`);
      }
    }
    const query = `UPDATE ${this.constructor.name}
    SET ${values.join(",")}
    WHERE ${pk.join(" AND ")}
    RETURNING *`;
    return await this.exec(query);
  }
  
  async remove() {
    const values = this.getPrimaryKey();
    const query = `DELETE FROM ${this.constructor.name}
      WHERE ${values.join(" AND ")}`;
    await this.exec(query);
    return;
  }

  getPrimaryKey() {
    const values = [];
    const meta = this.constructor.meta().columns;
    for (const key in meta) {
      if (meta[key].primary) {
        values.push(`${key} = '${this[key]}'`);
      }
    }
    return values;
  }

  toJson() {
    const obj = {};
    const meta = this.constructor.meta().columns;
    for (const key in meta) {
      obj[key] = this[key];
    }
    return JSON.stringify(obj);
  }
}
