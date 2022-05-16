// all the controllers come in here
const Response = require('../../utils/response');
const { validateData } = require("../../utils/validator");
const { createLinkSchemaValidator, updateLinkSchemaValidator } = require("./schema");
const Link = require("./models");
const { formatMessage } = require('../../utils/formatter');

exports.createLink = async (req, res) => {
    // validate here
    try {
        let link = req.body;
        let validatedData = await validateData(link, createLinkSchemaValidator);

        // if the link data is not valid, return an error response
        if (!validatedData.isValid) {
            let errorMessage = formatMessage(validatedData.error.message ? validatedData.error.message : validatedData.error);
            let response = Response.error(400, errorMessage);
            res.status(response.code).send(response);
            return;
        }

        // checking if author exists
        if(!(await Link.authorExists(link.author))) {
            // if no author exists
            let response = Response.error(400, "invalid author id provided");
            res.status(response.code).send(response);
            return;
        }

        // checking if the same link exists for this user
        if (!(await Link.isUnique(link.url, link.author))) {
            let response = Response.error(400, "link already exists");
            res.status(response.code).send(response);
            return;
        }
       
        // save the link to db after passing validation
        const result = await Link.create(link);
        let response = Response.success(201, "Link created successfully", result);
        res.status(response.code).send(response);
        return;
        
    } catch (error) {
        let errorMessage = formatMessage(error.message ? error.message : error);
        let response = Response.error(400, errorMessage);
        res.status(response.code).send(response);
        return;
    }
}

exports.getLinkById = async (req, res) => {
    // validate here
    try {
        let id = req.params.id
        const result = await Link.getById(id);
        let response = Response.success(200, "fetched link successfully", result);
        res.status(response.code).send(response);
        
    } catch (error) {
        let errorMessage = formatMessage(error.message ? error.message : error);
        let response = Response.error(400, errorMessage);
        res.status(response.code).send(response);
    }
}

exports.updateLink = async (req, res) => {
    // validate here
    try {
        let id = req.params.id;
        const linkData = req.body;
        
        let validatedData = await validateData(linkData, updateLinkSchemaValidator);
    
        // if the link data is not valid, return an error response
        if (!validatedData.isValid) {
            let errorMessage = formatMessage(validatedData.error.message ? validatedData.error.message : validatedData.error);
            let response = Response.error(400, errorMessage);
            res.status(response.code).send(response);
            return;
        }
        
        // checking if author provided owns the link to be updated
        if(!(await Link.authorExists(linkData.author, id))) {
            // if no author exists
            let response = Response.error(400, "invalid author id provided");
            res.status(response.code).send(response);
            return;
        }
        
        if (linkData.url) {
            // checking if the new link is unique to the author
            if (!(await Link.isUnique(linkData.url, linkData.author))) {
                let response = Response.error(
                    400,
                    "This link already exists with this author"
                );
                res.status(response.code).send(response);
                return;
            }
        }
        
        // updating link
        const result = await Link.update(id, linkData);
        let response = Response.success(200, "Link updated successfully", result);
        res.status(response.code).send(response);
        return;

    } catch (error) {
        let errorMessage = formatMessage(error.message ? error.message : error);
        let response = Response.error(400, errorMessage);
        res.status(response.code).send(response);
        return;
    }
}

exports.deleteLink = async (req, res) => {
    // validate here
    try {
        let id = req.params.id;
        const result = await Link.delete(id);
        let response = Response.success(200, "link deleted successfully");
        res.status(response.code).send(response);
    } catch (error) {
        let errorMessage = formatMessage(error.message ? error.message : error);
        let response = Response.error(400, errorMessage);
        res.status(response.code).send(response);
    }
}
