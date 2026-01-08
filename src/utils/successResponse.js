const responseSuccessfulServer=(res,statusCode,message)=>{
    res.status(statusCode).json(message);
};

module.exports={
    successResponse:responseSuccessfulServer
}
