import Student from './entity/student'
import Project from './entity/project'
import Note from './entity/note'

await orm.createConnection({
//   ...
//   synchronize: true,
//   entities: [
//     Student,
//     Project,
//     Note
//     ]
})