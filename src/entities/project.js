import Entity from "./entity";
export default class Project extends Entity {
  constructor(dbInstance, attributs) {
    super(dbInstance, attributs);
  }

  static name = "project";

  static meta() {
    return {
      name: "Project",
      columns: {
        id: {
          primary: true,
          type: "int",
          generated: true
        },
        name: {
          type: "string"
        }
      }
    };
  }
}
