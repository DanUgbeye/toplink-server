const { auth, requiresAuth } = require('express-openid-connect');
const Settings = require('../../helpers/settings')
const Router = require('express').Router();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: Settings.getSecret(),
    baseURL: Settings.getBaseURL(),
    clientID: Settings.getClientID(),
    issuerBaseURL: Settings.getIssuerBaseURL(),

};

// auth router attaches /login, /logout, and /callback routes to the baseURL
let authRouter = auth(config);

// Router.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// // req.isAuthenticated is provided from the auth router
// Router.get('/login', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// Router.get('/authoUser', requiresAuth(), (req, res) => {

//     if (req.oidc.user.email) {
//         res.send('Email Already Exist!!!')
//     }
//     else {
//         res.send("Email Not Found!!!");
//     }

// });
module.exports = authRouter;
