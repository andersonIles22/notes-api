// Este script recupera todas las notas de la base de datos PostgreSQL
const Pool=require('pg').Pool;
require('dotenv').config();
const pool=new Pool({
  connectionString:process.env.DATABASE_URL_NOTES_DB
}); 

async function getNotes(){
  try{
    const res=await pool.query('SELECT * FROM notes ORDER BY created_at DESC');
    if (res.rows.length===0){
      console.log('No hay notas wey');
      return;
    }
    console.log(`Se recuperaron ${res.rows.length} notes.`);
    console.table(res.rows);
  }catch(err){
    console.error('Error al recuperar los registros:',err.message);
    throw err;
  }
  finally{
    await pool.end();
  }
}
getNotes();
