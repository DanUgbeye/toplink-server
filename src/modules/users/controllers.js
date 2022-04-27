// all the controllers come in here

const { getUserById, createUser, updateUser, deleteUser } = require("./models");

exports.getUserById = async (req, res) => {
    let id = req.params.id
    const response = await getUserById(id);
    res.status(response.code).send(response);
}

exports.createUser = async (req, res) => {
    let user = req.body;
    const response = await createUser(user);
    res.status(response.code).send(response);
}

exports.updateUser = async (req, res) => {
    let id = req.params.id;
    const userData = req.body;
    const response = await updateUser(id, userData)
    res.status(response.code).send(response);
}

exports.deleteUser = async (req, res) => {
    let id = req.params.id;
    const response = await deleteUser(id);
    res.status(response.code).send(response);
}