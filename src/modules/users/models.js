// all the models come in here
const mongoose = require('mongoose');
const { userSchema, userSchemaValidator } = require("./schema");
const { validateData } = require("../../utils/validator");
const Response = require('../../utils/response');

const userModel = mongoose.model('User', userSchema);

async function isUniqueEmail(email) {
  let user = await userModel.find({ email: email });
  if(!user) {
    return true;
  }
  return false;
}

async function isUniqueUsername(username) {
  let user = await userModel.find({ username: username });
  if(!user) {
    return true;
  }
  return false;
}

exports.getUserById = async function getUserById(id) {
  const result = await userModel.find({ _id: id });
  if(!result) {
    return Response('error', 400, 'invalid user id provided');   
  }
  return Response('success', 201, 'fetched all users successfully', result);
}

exports.createNewUser = async function createNewUser(user) {

  let validatedData = validateData(user, userSchemaValidator);

  // if the user data is not valid, return an error response
  if(!validatedData.isValid) {
    return Response('error', 400, validatedData.error);
  }

  if( !isUniqueEmail(user.email) ) {
    return Response('error', 400, 'email address already exists');
  }

  if( !isUniqueUsername(user.username) ) {
    return Response('error', 400, 'username already exists');   
  }
  
  const newUser = new userModel(user);
  newUser.save()
    .then((result) => {
      return Response('success', 201, 'user created successfully', result);
    })
    .catch((error) => {
      return Response('error', 500, error);
    });
  
}

exports.updateUser = async function updateUser(id, userData) {

  if(userData.email) {
    if( !isUniqueEmail(user.email) ) {
      return Response('error', 400, 'email address already exists');
    }
  }

  if(userData.username) {
    if( !isUniqueUsername(user.username) ) {
      return Response('error', 400, 'username already exists');   
    }
  }

  const user = userModel.find({ _id: id });
  if (!user) {
    return Response('error', 400, 'invalid user id provided');   
  }
  try {
    // updates the user data 
    const updatedUser = {
      ...user,
      ...userData
    }
    const result = await userModel.findByIdAndUpdate(id, updatedUser);
    return Response('success', 201, 'user data updated successfully', result);
  } catch (error) {
    return Response('error', 500, error);
  }

}

exports.deleteUser = async function deleteUser(id) {
  const deletedUser = await userModel.findByIdAndDelete(id)
  if(!deletedUser) {
    return Response('error', 400, 'invalid user id provided');   
  }
  return Response('success', 200, 'user deleted successfully');
}

exports.getAllUsers = async function getAllUsers() {
  const result = await userModel.find();
  return Response('success', 201, 'fetched all users successfully', result);
}


