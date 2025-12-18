// Este script elimina una nota de la base de datos PostgreSQL
const Pool=require('pg').Pool;
require('dotenv').config();
const pool=new Pool({
  connectionString:process.env.DATABASE_URL_NOTES_DB
});

async function deleteNote(id){
    try{
        const checkId=await pool.query('SELECT * FROM notes WHERE id=$1',[id]);
       if(checkId.rows.length===0){
        console.log(`La nota con el id ${id} No existe we.`);
        return;
       }
        const res=await pool.query('DELETE FROM notes WHERE id=$1 RETURNING *',[id]);  
        console.log("Fila eliminada:",res.rows[0]);
    }catch(err){
        console.error('Error al eliminar la nota:', err.message);
        throw err;
    }finally{
        await pool.end();
    }
}
deleteNote(2);