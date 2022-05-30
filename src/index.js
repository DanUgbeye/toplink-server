const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Settings = require('./helpers/settings');
const { dbConnection } = require('./utils/database');
const Router = require('./appRouter');
const userRouter = require('./modules/users/routes');
// const { auth, requiresAuth } = require('express-openid-connect')

//auth router
const { authRouter } = require('./modules/auths/routes')


// auth0 configuration
// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: Settings.getSecret(),
//     baseURL: Settings.getBaseURL(),
//     clientID: Settings.getClientID(),
//     issuerBaseURL: Settings.getIssuerBaseURL()
//   };


const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(auth(config));

app.use(Router);
app.use(authRouter)

app.route('/').get((req, res) => {
    res.send('server up and running!!!');
});

const conn = dbConnection();

conn.then(() => {
    console.log('db connected successfully');
    
    const PORT = Settings.getPort();
    app.listen( PORT, () => {
        console.log(`app started on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})
