const Router = require('express').Router();
const linkRouter = require('./modules/links/routes');
const userRouter = require('./modules/users/routes');
const Response = require('./utils/response');
const { auth, requiresAuth } = require('express-openid-connect');
const Settings = require('./helpers/settings');
const checkUser = require('./utils/validator')

Router.use('/user', userRouter);
Router.use('/link', linkRouter);
// Router.use('/page', pageRouter);

Router.route('/api/error').get((req, res) => {
    const response = Response('error', 400, 'you messaged this api');
    res.send(response);
})

Router.route('/api/success').get((req, res) => {
    const response = Response('success', 200, 'you messaged this api');
    res.send(response);
})

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: Settings.getSecret(),
    baseURL: Settings.getBaseURL(),
    clientID: Settings.getClientID(),
    issuerBaseURL: Settings.getIssuerBaseURL(),
   
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
Router.use(auth(config));

Router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// req.isAuthenticated is provided from the auth router
Router.get('/login', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

Router.get('/authoUser', requiresAuth(), (req, res) => {

    if (req.oidc.user.email) {
        res.send('Email Already Exist!!!')
    }
    else {
        res.send("Email Not Found!!!");
    }
    
});

module.exports = Router;

// const random = require('randomstring');
// console.log(random.generate(40))