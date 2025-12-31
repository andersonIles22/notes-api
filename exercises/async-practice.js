// #region Asincronía con Callbacks 

function anyCallBack(parametro1){
    setTimeout(()=>{
        parametro1()
    },2000)
}
//                               Ejemplo de Callback Anidado
function anyCallBackOne(){
    console.log("Primero en ejecutarse")
    anyCallBack(()=>{
        console.log("Segundo en ejecutarse")
        anyCallBack(()=>{
            console.log("Tercero en ejecutarse")
            anyCallBack(()=>{
                console.log("Cuarto en ejecutarse")
            })
            console.log("Ejecutado 3")
        })
        console.log("Ejecutado 2")
    })
    console.log("Ejecutado 1")
}

anyCallBack(anyCallBackOne)

// #region Asincronía con Promises
//                             Ejemplo de Promesas Anidadas  
const exNumber=12
//Primera manera para escribir Promises
const exPromise= new Promise((resolve,reject)=>{
    // Comprobación del valor de exNumber
    if(exNumber===12){
        console.log("Primera ejecución")
        setTimeout(()=>{
        //Llamada a la función exPromise2 y resolución de la promesa
            resolve(exPromise2())
        },0)
        console.log("se finalizó la primera promesa")
    }
    else{
       console.log("Segunda ejecución")
       setTimeout(()=>{
        // Rechazo de la promesa con un mensaje de error
           reject("No manches puerco")
       },5000)
    }
})
//          Segunda manera para escribir Promises
const exPromise2= ()=>{
    return new Promise((resolve,reject)=>{
        // Se ejecuta esta parte del código al resolverse la primera promesa
        console.log("Tercera ejecucción")
        // Se resuelve la segunda promesa con un mensaje
        setTimeout(()=>{
            resolve("Bien hecho puerco, se acabo")
        },5000)
    })
}
//           Manejo de la primera promesa
exPromise
.then((result)=>{
    console.log(result)
    throw new Error("No jodas")
})
.then((result2)=>
    console.log(result2)
)
.catch((parametre)=>{
    console.log("Manejo del error")
    console.log(parametre)
}) 


// #region Asincronía con Async/Await

//                     Ejemplo de Globos con Async/Await
async function explotarGlobol(){
    console.log("Empezando a explotar globos")
    const globo1=await globo1Promise;
    const globo2=await globo2Promise;
    console.log(globo1);
    console.log(globo2);
    setTimeout(()=>{
        console.log("A ver dijo el ciego")
    },2000)
}
function explotarGloboPromises(ms, mensaje,aviso){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mensaje);
        }, ms);
        console.log(aviso);
    });
}
const globo1Promise = explotarGloboPromises(3000, "Exploto globo 1", "promise 1 creada");
const globo2Promise = explotarGloboPromises(5000, "Exploto globo 2", "promise 2 creada");
explotarGlobol()

// Otro Ejemplo de Async/Await

//                                      Almacen de Pizzas
//                  Se utiliza un valor booleano para simular éxito o fracaso en el proceso
let valueLogic= false;
//                    Función para simular espera y posible error
const esperar= async (ms,mensaje)=>{
    await new Promise((resolve)=> setTimeout(resolve,ms));
    if(!valueLogic){
        throw new Error("Error en el proceso de la pizza");
    }
    return mensaje;
}
//                   Función principal para ordenar pizza
const ordenarPizza= async ()=>{
    console.log("Iniciando orden de pizza");
    try{
    const verificarInventario= await esperar(4000,"Inventario verificado");
    console.log(verificarInventario);
    const procesarPago= await esperar(2000,"Pago procesado");
    console.log(procesarPago);
    const prepararPizza= await esperar(6000,"Pizza preparada");
    console.log(prepararPizza);
    console.log("Disfruta tu pizza, brou");
    return "Ta bien ";
    }
    catch(error){
        console.log(error);
        return error;
    }
};
ordenarPizza()


// #region Asincronía con Promise.all
//                    Preparación de Ingredientes para una receta
//           Simulación de posible error en la preparación
let thereIsError= true;
const proceso= async (ms, mensaje) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
    if (!thereIsError) {
        throw new Error("Error en la preparación de ingredientes");
    }
    console.log(mensaje);
};
//                   Función para preparar todos los ingredientes
const prepararIngredientes= async ()=>{
    const prepararTomate= proceso(4000,"Tomate preparado");
    const prepararQueso= proceso(2000,"Queso preparado");
    const prepararJamon= proceso(2000,"Jamón preparado");
    try{
        const resultado=await Promise.all([prepararTomate, prepararQueso, prepararJamon]);
        console.log("Ingredientes listos, a cocinar");
        return resultado;
    }
    catch(error){
        console.log(error);
        console.log("No se pudo preparar los ingredientes");
    }
};
prepararIngredientes()

// #region Ejecicios con Promise.allSetted
//                    Evaluación de Estudiantes
//          Establecemos una lista de estudiantes con sus puntajes y tiempos de resolución
const students=[
    {fullName:"Joel Páez",score:9,timeResolved:2000},
    {fullName:"Ximena Perez",score:7,timeResolved:3000},
    {fullName:"PaulCasanova",score:10,timeResolved:1000},
    {fullName:"Maria Castillo",score:6,timeResolved:4000},
];
//          Función para obtener la calificación de un estudiante
const getScore= async (score,timeResolved,nameStudent)=>{
    await new Promise((resolve)=> setTimeout(resolve,timeResolved));
    if(score<8){
        throw new Error(`El Estudiante ${nameStudent} obtuvo:${score} y es un pena, y su padre es el negro Jose xdxdxd`);
    }
    return `El Estudiante ${nameStudent} obtuvo:${score}, por lo tanto ¡Bien hecho puerco!`;
}
//          Función para ejecutar la revisión final 
const getReview= async ()=>{
    const promisesStudents= students.map(student=>getScore(student.score,student.timeResolved,student.fullName));
    try {
        const result=await Promise.allSettled(promisesStudents);
        console.log(result);
        console.log("Todos los estudiantes han sido evaluados");
    }
    catch(error){
        console.log(error);
    }

}
getReview()