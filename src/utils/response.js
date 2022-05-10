/**
 * @param type either 'success' or 'error'
 * @param code the status code of the response
 * @param message the message to be sent
 * @param data contains the fetched resource if any
 */

class Response {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    error() {
        return {
            code: this.code,
            message: this.message
        }
    }

    successMessage() {
        return {
            code: this.code,
            message: this.message
        }
    }

    successData() {
        return {
            code: this.code,
            message: this.message,
            data: this.data
        }
    }
}

module.exports = Response;