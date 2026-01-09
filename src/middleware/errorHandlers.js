  // Centralized Error Handler
const errorHandler=(err, req, res, next)=>{
  // si queremos mostrar la linea de codigo donde empieza a fallar
  //console.error('Error:', err.stack);
  
  const statusCode = err.status || 500;
  const message = err.message || 'Internal server error';
  
  res.status(statusCode).json({
    success: false,
    error: message,
    data:null
  });
};

// Error Handler
const error=(statusCode,message, next)=>{
    const error=new Error(message);
    error.status=statusCode;
    next(error);
};

module.exports = { errorHandler, error };