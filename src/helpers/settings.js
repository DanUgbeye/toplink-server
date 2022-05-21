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
    let secret = process.env.SECRET || config.auth0_secret
    return secret;
  
  }
  static getBaseURL() {
    let baseURL = process.env.BASEURL || config.baseURL
    return baseURL;
  }
  static getClientID() {
    let clientID = process.env.CLIENTID || config.auth0_clientID
    return clientID;
  }
  static getIssuerBaseURL() {
    let issuerBaseURL = process.env.ISSUERBASEURL || config.auth0_issuerBaseURL
    return issuerBaseURL;
  }
}
module.exports = Settings;
