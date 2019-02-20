import mOrm from "./mOrm";
import { mLog ,mDump } from "@mhirba/utils";
const orm = new mOrm();

(async () => {
  try {
    await orm.createConnection({
      type: "PostgreSQL",
      host: "localhost",
      port: 5432,
      username: "julienluccioni",
      password: "",
      database: "test"
    });
  } catch (err) {
    console.log(`Error:  ${err.message}`);
    process.exit(-1);
  }

  let student = {
    firstname: "julien",
    lastname: "luccioni"
  };
  const dbContext = orm.getDbContext();

  mLog("Student", { how: "red" });
  mLog(" insert student", { how: "red" });
  const studentInDb = await dbContext.Student.save(student);
  await dbContext.Student.save({ lastname: "john", firstname: "doe" });
  const toRemove = await dbContext.Student.save({
    lastname: "Mac",
    firstname: "Arty"
  });
  mLog(" inserted:" + studentInDb.toJson(), { how: "blue" });
  mLog(" update student", { how: "red" });
  studentInDb.firstname = "juju";
  await studentInDb.update();
  await toRemove.remove();
  mLog(" select student", { how: "red" });
  const studentSelect = await dbContext.Student.findByPk(studentInDb.id);
  const studentSelectOne = await dbContext.Student.findOne({
    where: { lastname: "john" }
  });
  mLog(" find by pk:" + studentSelect.toJson(), { how: "blue" });
  mLog(" find one:" + studentSelectOne.toJson(), { how: "blue" });
  mLog(" select all student", { how: "red" });
  const studentSelectAll = await dbContext.Student.findAll();
  mLog(" find all:", { how: "blue" });
  studentSelectAll.forEach(student => {
    mLog(" " + student.toJson(), { how: "blue" });
  });

  let project = {
    name : "c#"
  }
  mLog("Project", { how: "red" });
  const projectInserted = await dbContext.Project.save(project)
  mLog(" insert project", { how: "red" });
  const proj = await dbContext.Project.findByPk(projectInserted.id);
  mLog(" inserted:" + projectInserted.toJson(), { how: "blue" });
  mLog(" find by pk:" + proj.toJson(), { how: "blue" });

  let note ={
    id_student:studentInDb.id,
    id_project:proj.id,
    note:15
  }
  const notel = await dbContext.Note.save(note)
  notel.remove();
  const n = await dbContext.Note.findByPk(notel.id_student);
  mDump(n.toJson())
})();
