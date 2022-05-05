// all the controllers come in here
const Response = require('../../utils/response');
const { validateData } = require("../../utils/validator");
const { linkSchemaValidator, linkSchema } = require("./schema");

const { getLinkById, createLink, updateLink, deleteLink, isUniqueLink, authorExists } = require("./models");
const Joi = require('joi');



exports.createLink = async (req, res) => {
    // validate here
    try {
        let link = req.body;
        let validatedData = await validateData(link, linkSchemaValidator);

        // if the link data is not valid, return an error response
        if (!validatedData.isValid) {
            let response = Response("error", 400, (validatedData.error.message ? validatedData.error.message : validatedData.error));
            res.status(response.code).send(response);
            return;
        }

        // checking if author exists
        if(!(await authorExists(link.author))) {
            // if no author exists
            let response = Response("error", 400, "invalid author id provided");
            res.status(response.code).send(response);
            return;
        }

        // checking if the same link exists for this user
        if (!(await isUniqueLink(link.url, link.author))) {
            let response = Response("error", 400, "link already exists");
            res.status(response.code).send(response);
            return;
        }
       
        // save the link to db after passing validation
        const result = await createLink(link);
        let response = Response("success", 201, "Link created successfully", result);
        res.status(response.code).send(response);
        return;
        
    } catch (error) {
        let response = Response("error", 400, (error.message ? error.message : error));
        res.status(response.code).send(response);
        return;
    }
}

exports.getLinkById = async (req, res) => {
    // validate here
    try {
        let id = req.params.id
        const result = await getLinkById(id);
        let response = Response("success", 200, "fetched link successfully", result);
        res.status(response.code).send(response);
        
    } catch (error) {
        let response = Response("error", 400, (error.message ? error.message : error));
        res.status(response.code).send(response);
    }
}

exports.updateLink = async (req, res) => {
    // validate here
    let id = req.params.id;
    const linkData = req.body;
    try {
        // checking if author provided owns the link to be updated
        if(!(await authorExists(linkData.author, id))) {
            // if no author exists
            let response = Response("error", 400, "invalid author id provided");
            res.status(response.code).send(response);
            return;
        }
        
        if (linkData.url) {
            // checking if the new url to be updated is a valid url
            try {
              await Joi.string().uri().validateAsync(linkData.url);
            } catch (error) {
                let response = Response("error", 400, "url must be valid url");
                res.status(response.code).send(response);
                return;
            }
        
            // checking if the new link is unique to the author
            if (!(await isUniqueLink(linkData.url, linkData.author))) {
                let response = Response(
                    "error",
                    400,
                    "This link already exists with this author "
                );
                res.status(response.code).send(response);
                return;
            }
        }
        
        // checking if the new icon url to be updated is a valid url
        if(linkData.icon) {
            try {
                await Joi.string().uri().validateAsync(linkData.icon);
            } catch (error) {
                let response = Response("error", 400, "icon must be a valid url");
                res.status(response.code).send(response);
                return;
            }
        }
        
        // updating link
        const result = await updateLink(id, linkData);
        let response = Response("success", 200, "Link updated successfully", result);
        res.status(response.code).send(response);
        return;

    } catch (error) {
        let response = Response("error", 400, (error.message ? error.message : error));
        res.status(response.code).send(response);
        return;
    }
}

exports.deleteLink = async (req, res) => {
    // validate here
    try {
        let id = req.params.id;
        const result = await deleteLink(id);
        let response = Response("success", 200, "link deleted successfully");
        res.status(response.code).send(response);
    } catch (error) {
        let response = Response("error", 400, (error.message ? error.message : error));
        res.status(response.code).send(response);
    }
}
