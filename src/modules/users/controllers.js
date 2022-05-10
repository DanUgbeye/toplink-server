// all the controllers come in here
const mongoose = require('mongoose');
const { userSchemaValidator } = require("./schema");
const { validateData } = require("../../utils/validator");
const User = require("./models");
const Response = require('../../utils/response');


exports.getUserById = async (req, res) => {
    try {
        let id = req.params.id
        const result = await User.getById(id);
        let response = new Response(200, 'fetched user data successfully', result).successData();
        res.status(response.code).send(response);
        return;
    } catch (error) {
        let response = new Response(400, (error.message ? error.message : error)).error();
        res.status(response.code).send(response);
        return;
    }
}

exports.createUser = async (req, res) => {
    try {
        let user = req.body;
        let validatedData = await validateData(user, userSchemaValidator);

        // if the user data is not valid, return an error response
        if(!validatedData.isValid) {
            let response = new Response(400, (validatedData.error.message ? validatedData.error.message : validatedData.error)).error();
            res.status(response.code).send(response);
            return;
        }

        if( !(await User.isUniqueEmail(user.email)) ) {
            let response = new Response(400, 'email address already exists').error();
            res.status(response.code).send(response);
            return;
        }

        if( !(await User.isUniqueUsername(user.username)) ) {
            let response = new Response(400, 'username already exists').error();   
            res.status(response.code).send(response);
            return;
        }

        const result = await User.create(user);
        let response = new Response(201, 'user created successfully', result).successData();
        res.status(response.code).send(response);
        return;
    } catch (error) {
        let response = new Response(400, (error.message ? error.message : error)).error();
        res.status(response.code).send(response);
        return;
    }
}

exports.updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        const userData = req.body;
        if(userData.email) {
            if( !(await User.isUniqueEmail(userData.email)) ) {
                let response = new Response(400, 'email address already exists').error();
                res.status(response.code).send(response);
                return;
            }
          }
        
          if(userData.username) {
            if( !(await User.isUniqueUsername(userData.username)) ) {
                let response = new Response(400, 'username already exists').error();   
                res.status(response.code).send(response);
                return;
            }
          }
        
          if(userData.subscription) {
            // TO-DO: implement checks before updating subscription here
          }
        
          if(userData.password) {
            // TO-DO: implement checks before updating password here
          }

        const result = await User.update(id, userData)
        let response = new Response(200, 'user data updated successfully', result).successData();
        res.status(response.code).send(response);
        return;
    } catch (error) {
        let response = new Response(400, (error.message ? error.message : error)).error();
        res.status(response.code).send(response);
        return;
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        const result = await User.delete(id);
        let response = new Response(200, 'user deleted successfully').successMessage();
        res.status(response.code).send(response);
        return;
    } catch (error) {
        let response = new Response(400, (error.message ? error.message : error)).error();
        res.status(response.code).send(response);
        return;
    }
}