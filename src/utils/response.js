const responseSuccessfulServer=(res,statusCode,message)=>{
    res.statusCode=statusCode;
    typeof message==='string' ? res.end(JSON.stringify({message:message})) :  res.end(JSON.stringify(message));
};
const responseErrorServer=(res,statusCode,message)=>{
    res.statusCode=statusCode;
    res.end(JSON.stringify({error:message}));
};
module.exports={
    successResponse:responseSuccessfulServer,
    errorResponse:responseErrorServer
}
