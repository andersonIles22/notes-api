// Este script actualiza el titulo de una nota en la base de datos PostgreSQL

const Pool=require('pg').Pool;
require('dotenv').config();
const pool=new Pool({
  connectionString:process.env.DATABASE_URL_NOTES_DB
}); 
async function updateNote(title,id){
    try{
        const checkId=await pool.query('SELECT * FROM notes WHERE id=$1',[id]);
       if(checkId.rows.length===0){
        console.log(`La nota con el id ${id} No existe we.`);
        return;
       }
        const res=await pool.query('UPDATE notes SET title=$1, updated_at=NOW() WHERE id=$2 RETURNING *',[title,id]);  
        console.log("Fila actualizada:",res.rows[0]);

        
    }catch(err){
        console.error('Error al actualizar la nota:', err.message);
        throw err;
    }finally{
        await pool.end();
    }
}
updateNote('Updated Third Note Title',3);