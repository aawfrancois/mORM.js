import mOrm from './mOrm'
import Student from './entities/student'

const orm = new mOrm()

;(async () => {
    let connection

    try{
        await orm.createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username:'julienluccioni',
            password: '',
            database: 'test',
            synchronize: true,
            entities: [Student]
        })
    } catch (err) {
        throw new Error(`Error Message ${err.message}`)
        process.exit(-1)
    }

    let Student = {
        firstname: 'Julien',
        lastname: 'Luccioni'
    }

    const StudentEntity = orm.getEntity('Student')
    console.log(StudentEntity)
    const savedStudent = await StudentEntity.save(Student)
})
