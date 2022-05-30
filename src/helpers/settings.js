require("dotenv").config();
const {config} = require('./config')
//get variable from env file
class Settings {
  static getPort() {
    let port = process.env.PORT || config.port
    return port;
  }

  static getHost() {
    let host = process.env.HOST || config.host
    return host;
  }

  static getDB_URI() {
    return process.env.DB_URI || config.db_uri
  }

  static getSecret() {
    return process.env.SECRET || config.secret
  }

  static getBaseURL() {
    return process.env.BASEURL || config.baseURL
  }

  static getClientID() {
    return process.env.CLIENTID || config.clientID
  }

  static getIssuerBaseURL() {
    return process.env.ISSUERBASEURL || config.issuerBaseURL
  }
}

module.exports = Settings;
