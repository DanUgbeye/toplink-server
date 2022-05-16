
/**
 * this function removes quote characters from a string to prevent string reading issues
 * @param {string} message this is a message containing characters to be removed
 * @returns 
 */
exports.formatMessage = (message) => {
    let formattedMessage = message.replaceAll('"', '');
    return formattedMessage;
}