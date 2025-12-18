const {Pool}=require('pg');
require('dotenv').config();

const pool=new Pool({
  connectionString:process.env.DATABASE_URL_NOTES_DB
}); 

async function testConnection(){
  try{
    const res=await pool.query('SELECT NOW()');
    console.log('Base de datos conectada, Tiempo:',res.rows[0].now);
  }catch(err){
    console.error('Error al conectarse al servidor pipipi:',err.message);
  }finally{
    await pool.end();
  }
}
testConnection();
module.exports=pool;