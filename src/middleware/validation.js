const {body,param,validationResult}=require('express-validator');
const {HTTP_STATUS}=require('../constants/httpStatusCode');
const {MESSAGES_VALIDATION}=require('../constants/messages');
const {VALIDATION}=require('../constants/validations')
/**
 * Rules to validating POST requests
 * Guarantee that title or content should not be empty and should be valid. And the values not should be more than 200 characters
 * @type {Array<Function>} 
 */
const validateNotePost=[
    body('title')
        .trim()
        .notEmpty().withMessage(MESSAGES_VALIDATION.TITTLE_REQUIRED)
        .isLength({max:VALIDATION.TITLE_MAX_LENGTH}).withMessage(MESSAGES_VALIDATION.TTTLE_TOO_LONG),
    body('content')
        .trim()
        .notEmpty().withMessage(MESSAGES_VALIDATION.CONTENT_REQUIRED)
        .isLength({max:VALIDATION.TITLE_MAX_LENGTH}).withMessage(MESSAGES_VALIDATION.CONTENT_TOO_LONG),
        /**
         * Internal Middleware to verify results of Express-Validator
         * @param {Object} req - Express Request
         * @param {Object} res - Express Response
         * @param {Function} next - Next-Function, next to other validator-middleware or directly to the Controllers  
         * @returns {void} just a error response to client
         */
    (req,res,next)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
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

/**
 * Rules to validating PUT requests
 * Guarantee that title or content should not be empty and should be valid. And the values not should be more than 200 characters.
 * Besides,the title and content field are be optionals, but their formats should be valid
 * @type {Array<Function>} 
 */
const validateNotePut=[
    body('title')
        .trim()
        .optional()
        .notEmpty().withMessage(MESSAGES_VALIDATION.TITTLE_REQUIRED)
        .isLength({max:VALIDATION.TITLE_MAX_LENGTH}).withMessage(MESSAGES_VALIDATION.TTTLE_TOO_LONG),
    body('content')
        .trim()
        .optional()
        .notEmpty().withMessage(MESSAGES_VALIDATION.CONTENT_REQUIRED)
        .isLength({max:VALIDATION.TITLE_MAX_LENGTH}).withMessage(MESSAGES_VALIDATION.CONTENT_TOO_LONG),
    /**
     * Internal Middleware to verify results of Express-Validator
     * @param {Object} req - Express Request
     * @param {Object} res - Express Response
     * @param {Function} next - Next-Function, next to other validator-middleware or directly to the Controllers  
     * @returns {void} just a error response to client
     */
    (req,res,next)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
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


/**
 * Rules to validating the id parameter in the URL
 * Guarantee that id must be a positive integer.
 * @type {Array<Function>} 
 */
const validateId=[
    param('id')
    .isInt({min:VALIDATION.TITLE_MIN_LENGTH}).withMessage(MESSAGES_VALIDATION.ID_POSITIVE),
    /**
     * Internal Middleware to verify results of Express-Validator
     * @param {Object} req - Express Request
     * @param {Object} res - Express Response
     * @param {Function} next - Next-Function, next to other validator-middleware or directly to the Controllers  
     * @returns  {void} just a error response to client
     */
    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status().json({ 
        success: false, 
        error: MESSAGES_VALIDATION.ID_INVALID_FORMAT 
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