export default class Entity {
  constructor(dbInstance, name) {
    this.dbInstance = dbInstance;
    this.name = name;
  }

  async save(data) {
    const text = `INSERT INTO ${this.name}(firstname, lastname) VALUES($1, $2) RETURNING *`;
    try {
      const values = ["julien", "luccioni"];
      const res = await this.dbInstance.client.query(text, values);
      console.log(res.rows[0]);
    } catch (err) {
      console.log(err.stack);
    }
  }
  async count() {
    const text = `SELECT COUNT(*) FROM ${this.name}`;
    try {
      const res = await this.dbInstance.client.query(text);
      console.log(res.rows);
    } catch (err) {
      console.log(err.stack);
    }
  }
  async findByPk(id, { attributes }) {}
  async findAll({ attributes }) {}
  async findOne({ where, attributes }) {}
  async update(data) {}
  async remove(data) {}
}
