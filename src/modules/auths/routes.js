const express = require('express')
const authRouter = express.Router();

const { requiresAuth } = require('express-openid-connect')



authRouter.get('/',  (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

  
authRouter.get('/public',  (req, res) => {
    res.send("Welcome to the home page")
});

authRouter.get('/private', requiresAuth(), (req, res) => {
    if(req.oidc.isAuthenticated){
        res.json({
            "user": req.oidc.user.email,
            "message": "Welcome to your private space"
        })
    }else {
        res.json({
            "message": "access denied"
        })
    }
    
});

module.exports = {
    authRouter,
}