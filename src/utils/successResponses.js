const {MESSAGES_OPERATION}=require('../constants/messages')

/**
 * Send standardized response to successful reading.
 * @param {Object} res Object response of Express. 
 * @param {number} statusCode Success code HTTP (recommend 200). 
 * @param {Object|Array} data Data obtained from the database
 * @returns {void}  The Function does not return anything, just responses to the client.
 */
const responseSuccessGet=(res,statusCode,data)=>{
    res.status(statusCode).json(
        {
          "success":true,
          "message":MESSAGES_OPERATION.SUCCESFUL_OPERATION,
          "data":data
        }
    );
};

/**
 * Send standardized response to successful creation
 * @param {Object} res Object response of Express 
 * @param {number} statusCode Success code HTTP (recommend 201). 
 * @param {Object} data New resource created 
 * @returns {void}  The Function does not return anything, just responses to the client.
 */
const responseSuccessPost=(res,statusCode,data)=>{
    res.status(statusCode).json(
        {
          "success":true,
          "message":MESSAGES_OPERATION.NOTE_CREATED,
          "data":data
        }
    );
};

/**
 * Send standardized response to updateds (PUT/PATCH)
 * @param {Object} res Object response of Express 
 * @param {number} statusCode Success code HTTP (recommend 200). 
 * @param {Object} data Resource updated
 * @returns {void}  The Function does not return anything, just responses to the client.
 */

const responseSuccessPut=(res,statusCode,data)=>{
    res.status(statusCode).json(
        {
          "success":true,
          "message":MESSAGES_OPERATION.NOTE_UPDATED,
          "data":data
        }
    );
};

/**
 * Send standardized response to successful delete
 * @param {Object} res Object response of Express 
 * @param {number} statusCode Success code HTTP (recommend 200 or 204). 
 * @param {Object|null} data  Data of deleted object or null (when statusCode is 204)
 * @returns {void}  The Function does not return anything, just responses to the client.
 */
const responseSuccessDelete=(res,statusCode,data)=>{
    res.status(statusCode).json(
        {
          "success":true,
          "message":MESSAGES_OPERATION.NOTE_DELETED,
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
