const express=require('express');
const app= express();
const options={
    host:'127.0.0.1',
    port:process.env.PORT||3000
};
app.use(express.json())
app.get('/',(req,res)=>{
res.json('traka')
})
app.listen(options.port, ()=>{
    console.log('Servidor Iniciado')
})
console.log(express.json());
