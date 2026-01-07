const responseSuccessfulServer=(res,statusCode,message)=>{
    res.status(statusCode).json(message);
};
const responseErrorServer=(statusCode,message,next)=>{
    const error=new Error(message);
    error.status=statusCode;
    next(error);
};
module.exports={
    successResponse:responseSuccessfulServer,
    error:responseErrorServer
}
