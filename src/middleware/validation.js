const {body,param,validationResult}=require('express-validator');
//  Validación para solicitudes POST
const validateNotePost=[
    //indica a la librería que debe buscar la propiedad "title"en el objeto req.body
    body('title')
        // No valida, transforma para evitar guardar espacios inutiles
        .trim()
        //validación de presencia, revisa que no llega una cadena vacia, si es así se guarda el error detallado en withMessage()
        .notEmpty().withMessage('Title esta vacío we')
        // validación de control de tamaño, que no sobrepase mas de 200 caracteres
        .isLength({max:200}).withMessage('El valor de title debe tener maximo 200 caracteres'),
    body('content')
        .trim()
        .notEmpty().withMessage('content esta vacío we')
        .isLength({max:200}).withMessage('El valor de content debe tener maximo 200 caracteres'),
    (req,res,next)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
        }))
    });
}
next();
}
];

//Validación para solicitudes PUT
const validateNotePut=[
    body('title')
        // No valida, transforma para evitar guardar espacios inutiles
        .trim()
        // Permite que el valor sea opcional
        .optional()
        //validación de presencia, revisa que no llega una cadena vacia, si es así se guarda el error detallado en withMessage()
        .notEmpty().withMessage('Title esta vacío we')
        // validación de control de tamaño, que no sobrepase mas de 200 caracteres
        .isLength({max:200}).withMessage('El valor de title debe tener maximo 200 caracteres'),
    body('content')
        .trim()
        .optional()
        .notEmpty().withMessage('content esta vacío we')
        .isLength({max:200}).withMessage('El valor de content debe tener maximo 200 caracteres'),
    (req,res,next)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
        }))
    });
}
next();
}
];
// Validación del ID
const validateId=[
    param('id').isInt({min:1}).withMessage('Id debe ser positivo'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid ID format' 
      });
    }
    next();
  }
];

module.exports={
    validateNotePost,
    validateNotePut,
    validateId
}