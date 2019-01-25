import Entity from "./entity"

export default class Note extends Entity {
  constructor(dbInstance, name) {
    super(dbInstance, name);
  }
  
    static meta() {
      return {
        name: 'Project',
        columns: {
          id_student: {
            primary: true,
            foreignKey:true,
            type: 'int',
          },
          id_note: {
            primary: true,
            foreignKey:true,
            type: 'int',
          },
          name: {
            type: 'string'
          }
        }
      }
    }
  }