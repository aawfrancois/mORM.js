import Entity from "./entity";
export default class Student extends Entity {
  constructor(dbInstance, attributs) {
    super(dbInstance, attributs);
  }

  static name = "student";

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
