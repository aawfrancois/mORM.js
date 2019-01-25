import mOrm from "./mOrm";
import Student from "./entities/student";

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
      entities: [Student]
    });
  } catch (err) {
    console.log(`Error:  ${err.message}`);
    process.exit(-1);
  }

  // let student = {
  //   firstname: "Julien",
  //   lastname: "Luccioni"
  // };

  // const studentEntity = orm.getEntity("Student");
  // const savedStudent = await studentEntity.save(student);
})();
