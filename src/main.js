import mOrm from "./mOrm";
import Student from "./entities/student";
import Project from "./entities/project";
import Note from "./entities/note";

const orm = new mOrm();

(async () => {
  try {
    await orm.createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "julienluccioni",
      password: "",
      database: "test",
      synchronize: true,
      entities: [Student, Project, Note]
    });
  } catch (err) {
    console.log(`Error:  ${err.message}`);
    process.exit(-1);
  }

  let student = {
    firstname: "wesh",
    lastname: "lol"
  };

  const studentEntity = orm.getEntity("Student");
  let result = await studentEntity.findByPk(1, {
    attributes: ["lastname"]
  });
  console.log(result.toJson());
  result = await studentEntity.findOne();
  console.log(result);
})();
