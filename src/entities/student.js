import Entity from "./entity";
export default class Student extends Entity {
  constructor(dbInstance, name, attributs) {
    super(dbInstance, name, attributs);
  }

  async findByPk(id, { attributes = ["*"] } = {}) {
    const data = await super.findByPk(id, { attributes });
    console.log(data)
    return new Student(this.dbInstance, this.name, data);
  }

  toJson() {
    const id = this.id;
    return { id };
  }

  static meta() {
    return {
      name: "Student",
      columns: {
        id: {
          primary: true,
          type: "int",
          generated: true
        },
        firstname: {
          type: "string"
        },
        lastname: {
          type: "string"
        }
      }
    };
  }
}
