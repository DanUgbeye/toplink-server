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

    
}

module.exports = Settings