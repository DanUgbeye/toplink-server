require('dotenv').config()

//get variable from env file
class Settings {
    static getPort(){
        let port = process.env.PORT
        return port
    }

    static getHost(){
        let host = process.env.HOST
        return host
    }

    static getDB_URI(){
        return process.env.DB_URI
    }

    
}

module.exports = Settings