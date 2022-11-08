/**
 * @desc    Send any success response
 *
 * @param   {object | array} results
 * @param   {string} message
 * @param   {number} statusCode
 */
exports.SuccessResponse = (results, message = "OK", statusCode = 200) => {
    if (results) {
        return {
            status: true,
            statusCode: statusCode,
            message: message,
            results
        };
    } else
        return {
            status: true,
            statusCode: statusCode,
            message: message,
        };
};

/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */
exports.ErrorResponse = (statusCode, message) => {
    return {
        status: false,
        statusCode: statusCode,
        message: message,
    };
};

