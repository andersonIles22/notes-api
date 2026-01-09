const responseSuccessGet=(res,statusCode,data)=>{
    res.status(statusCode).json(
        {
          "success":true,
          "message":"Operación Exitosa",
          "data":data
        }
    );
};

const responseSuccessPost=(res,statusCode,data)=>{
    res.status(statusCode).json(
        {
          "success":true,
          "message":"Creación Exitosa",
          "data":data
        }
    );
};

const responseSuccessPut=(res,statusCode,data)=>{
    res.status(statusCode).json(
        {
          "success":true,
          "message":"Modificación Exitosa",
          "data":data
        }
    );
};

const responseSuccessDelete=(res,statusCode,data)=>{
    res.status(statusCode).json(
        {
          "success":true,
          "message":"Eliminación Exitosa",
          "data":data
        }
    );
};

module.exports={
    successGet:responseSuccessGet,
    successPost:responseSuccessPost,
    successPut:responseSuccessPut,
    successDelete:responseSuccessDelete
}
