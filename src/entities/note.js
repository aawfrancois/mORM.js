import Entity from "./entity";
import Student from "./student";
import Project from "./project";

export default class Note extends Entity {
  constructor(dbInstance, attributs) {
    super(dbInstance, attributs);
  }

  static name = "note";

  static meta() {
    return {
      name: "Project",
      columns: {
        id_student: {
          primary: true,
          foreignKey: true,
          reference:Student,
          type: "int"
        },
        id_project: {
          primary: true,
          foreignKey: true,
          reference:Project,
          type: "int"
        },
        name: {
          type: "string"
        }
      }
    };
  }
}
