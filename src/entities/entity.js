export default class Entity {
  constructor(dbInstance, name) {
    this.dbInstance = dbInstance;
    this.name = name;
  }

  setOne(){

  }

  async save(data) {
    const keys = [];
    const values = [];
    for (const key in data) {
      keys.push(key);
      values.push(`'${data[key]}'`);
    }
    const query = `INSERT INTO ${this.name} (${keys.join(
      ","
    )}) VALUES(${values.join(",")}) RETURNING *`;
    try {
      const res = await this.dbInstance.client.query(query);
      return res.rows[0];
    } catch (err) {
      console.log(err.stack);
    }
  }

  async count() {
    const query = `SELECT COUNT(*) FROM ${this.name}`;
    try {
      const res = await this.dbInstance.client.query(query);
      return res.rows;
    } catch (err) {
      console.log(err.stack);
    }
  }
  async findByPk(id, { attributes = ["*"] } = {}) {
    const query = `SELECT ${attributes.join(",")} FROM ${
      this.name
    } WHERE id = ${id}`;
    try {
      const res = await this.dbInstance.client.query(query);
      return res.rows[0];
    } catch (err) {
      console.log(err.stack);
    }
  }
  async findAll({ attributes = ["*"] } = {}) {
    const query = `SELECT ${attributes.join(",")} FROM ${this.name}`;
    try {
      const res = await this.dbInstance.client.query(query);
      return res.rows;
    } catch (err) {
      console.log(err.stack);
    }
  }
  async findOne({ where = { }, attributes = ["*"] } = {}) {
    const conditions = [];
    for (const key in where) {
      conditions.push(`${key} = '${where[key]}'`);
    }
    const query = `SELECT ${attributes.join(",")} FROM ${
      this.name
    } ${conditions.length == 0 ? "" : "WHERE"} ${conditions.join("AND")} LIMIT 1`;
    console.log(query)
    try {
      const res = await this.dbInstance.client.query(query);
      return res.rows;
    } catch (err) {
      console.log(err.stack);
    }
  }
  async update(data) {}
  async remove(data) {}
}
