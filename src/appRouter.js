const Router = require('express').Router();
const linkRouter = require('./modules/links/routes');
const userRouter = require('./modules/users/routes');
const Response = require('./utils/response');

Router.use('/user', userRouter);
Router.use('/link', linkRouter);
// Router.use('/page', pageRouter);

Router.route('/error').get((req, res) => {
    const response = Response.error(400, 'you messaged this api');
    res.send(response);
})

Router.route('/success').get((req, res) => {
    const response = Response.success( 200, 'you messaged this api');
    res.send(response);
})
module.exports = Router;