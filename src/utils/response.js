/**
 * @param type either 'success' or 'error'
 * @param code the status code of the response
 * @param message the message to be sent
 * @param data contains the fetched resource if any
 */
const Response = (type='', code=200, message='', data={}) => {
    const response = {
        code,
        status: type,
        message,
    }
    if(type === 'success' && data) {
        response.data = data;
    }
    return response;
}

module.exports = Response;