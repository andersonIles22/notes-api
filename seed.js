const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_NOTES_DB
}); 
let tasks=[
    {title:'First Note',content:'This is the content of the first note.'},
    {title:'Second Note',content:'This is the content of the second note.'},
    {title:'Third Note',content:'This is the content of the third note.'}
]
async function seedDatabase() {
    try {
        const removeRows=await pool.query('TRUNCATE TABLE notes RESTART IDENTITY');
        const promises=tasks.map(task=>{
            return pool.query('INSERT INTO notes (title, content, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())', [task.title, task.content]);
        });
        await Promise.all(promises).then(result=>{
            console.log('Insercción existosa.');
            console.log(`${result.length} registros insertados.`);
        })
    }
    catch(err){
        console.error('Error al tratar de insertar en la base de datos:', err.message);
    }
    finally{
    await pool.end();
    }
}
seedDatabase()


