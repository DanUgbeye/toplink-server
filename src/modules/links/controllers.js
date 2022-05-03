// all the controllers come in here
const { getLinkById, createLink, updateLink, deleteLink } = require("./models");

exports.createLink = async (req, res) => {
    // validate here
    let link = req.body;
    const response = await createLink(link);
    res.status(response.code).send(response);
}

exports.getLinkById = async (req, res) => {
    // validate here
    let id = req.params.id
    const response = await getLinkById(id);
    res.status(response.code).send(response);
}

exports.updateLink = async (req, res) => {
    // validate here
    let id = req.params.id;
    const linkData = req.body;
    const response = await updateLink(id, linkData)
    res.status(response.code).send(response);
}

exports.deleteLink = async (req, res) => {
    // validate here
    let id = req.params.id;
    const response = await deleteLink(id);
    res.status(response.code).send(response);
}
