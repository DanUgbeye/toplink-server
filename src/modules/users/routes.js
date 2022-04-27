// all the routes come in here
const userRouter = require('express').Router()
const { getUserById, createNewUser, updateUser, deleteUser } = require("./controllers");


userRouter.route('/').post(createNewUser)

userRouter.route('/:id').get(getUserById)

userRouter.route('/:id').patch(updateUser)

userRouter.route('/:id').delete(deleteUser)

module.exports = { userRouter }
