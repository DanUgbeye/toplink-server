
// all the models come in here
const mongoose = require("mongoose");
const { linkSchemaValidator, linkSchema } = require("./schema");
const { validateData } = require("../../utils/validator");
const Response = require("../../utils/response");
const Joi = require("joi");
const { link } = require("joi");

const linkModel = mongoose.model("Link", linkSchema);

exports.isUniqueLink = async function isUniqueLink(url, author) {
  let link = await linkModel.find({
    $and: [{ author: author }, { url: url }],
  });
  if (!link.length) {
    return true;
  }
  return false;
}

exports.authorExists = async (authorId, linkId=null) => {
  try {
    let author = (
      linkId === null ? 
      await mongoose.models.User.find({ _id: authorId }) : 
      await linkModel.find({ _id: linkId , author: authorId})
    );
    if(!!author.length) {
      return true;
    }
    return false;
  } catch (error) {
    return false;    
  }
}

exports.getLinkById = async function getLinkById(id) {
  try {
    const result = await linkModel.find({ _id: id });
    if (!result.length) {
      // return Response("error", 400, "invalid link id provided");
      throw new Error('invalid link id provided');
    }
    return result;
  } catch (error) {
    // return Response("error", 500, (error.message ? error.message : error));
    throw error;
  }
};

exports.createLink = async function createLink(link) {
  try {
    const newLink = new linkModel(link);
    const result = await newLink.save();
    return result;
  } catch (error) {
    // return Response("error", 500, (error.message ? error.message : error));
    throw new Error(error);
  }
};

exports.updateLink = async function updateLink(id, linkData) {
  const link = await linkModel.find({ _id: id });
  if (!link) {
    throw new Error('invalid link id provided');
  }
  const result = await linkModel.findByIdAndUpdate(id, linkData, { new: true });
  return result;
};

exports.deleteLink = async function deleteLink(id) {
  const deletedLink = await linkModel.findByIdAndDelete(id);
  if (!deletedLink) {
    throw new Error('invalid link id provided');
  }
  return deletedLink;
};

exports.getAllLinks = async function getAllLink(author) {
  try {
    const result = await linkModel.find({
      author: author,
    });
    return Response(
      "success",
      200,
      "fetched all links relating to this author successfully",
      result
    );    
  } catch (error) {
    return Response("error", 500, (error.message ? error.message : error));
  }
};

