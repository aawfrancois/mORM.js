import Entity from "./entity";
export default class Student extends Entity {
  constructor(dbInstance, name, attributs) {
    super(dbInstance, name);
    super.setObject(attributs);
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
