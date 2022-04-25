// all the routes come in here
const userRouter = require('express').Router()
const { getUserById, createNewUser, updateUser, deleteUser } = require("./controllers");


userRouter.route('/user').post(createNewUser)

userRouter.route('/user/:id').get(getUserById)

userRouter.route('/user/:id').patch(updateUser)

userRouter.route('/user/:id').delete(deleteUser)

module.exports = { userRouter }
