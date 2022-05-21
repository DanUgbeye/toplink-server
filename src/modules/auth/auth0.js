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

authRouter.get('/', (req, res) => {
    if(req.oidc.isAuthenticated()) {
        res.redirect('/user/62745963a26eb6dfc8ad55a5');
        return;
    }
    res.redirect('/login');
});

authRouter.get('/profile', requiresAuth(), (req, res) => {
    res.send(req.oidc.user);
});

module.exports = authRouter;
