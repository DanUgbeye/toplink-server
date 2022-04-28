
// all the models come in here
const mongoose = require("mongoose");
const { linkSchemaValidator, linkSchema } = require("./schema");
const { validateData } = require("../../utils/validator");
const Response = require("../../utils/response");
const Joi = require("joi");

const linkModel = mongoose.model("Link", linkSchema);

async function isUniqueLink(url, author) {
  let link = await linkModel.find({
    $and: [{ author: author }, { url: url }],
  });
  if (!link.length) {
    return true;
  }
  return false;
}

exports.getLinkById = async function getLinkById(id) {
  try {
    const result = await linkModel.find({ _id: id });
    if (!result.length) {
      return Response("error", 400, "invalid link id provided");
    }
    return Response("success", 200, "fetched link successfully", result);
  } catch (error) {
    return Response("error", 500, (error.message ? error.message : error));
  }
};

exports.createLink = async function createLink(link) {
  let validatedData = await validateData(link, linkSchemaValidator);

  // if the link data is not valid, return an error response
  if (!validatedData.isValid) {
    return Response("error", 400, (validatedData.error.message ? validatedData.error.message : validatedData.error));
  }

  if (!(await isUniqueLink(link.url, link.author))) {
    return Response("error", 400, " Link already exists");
  }

  const newLink = new linkModel(link);
  const response = newLink
    .save()
    .then((result) => {
      return Response("success", 201, "Link created successfully", result);
    })
    .catch((error) => {
      return Response("error", 500, (error.message ? error.message : error));
    });
    return response;
};

exports.updateLink = async function updateLink(id, linkData) {
  if (linkData.url) {
    // checking if the new url to be updated is a valid url
    try {
      await Joi.string().uri().validateAsync(linkData.url);
    } catch (error) {
      return Response("error", 400, "url must be valid url");
    }

    // checking if the new link is unique to the author
    if (!(await isUniqueLink(linkData.url, linkData.author))) {
      return Response(
        "error",
        400,
        "This link already exists with this author "
      );
    }
  }

  // checking if the new icon url to be updated is a valid url
  if(linkData.icon) {
    try {
      await Joi.string().uri().validateAsync(linkData.icon);
    } catch (error) {
      return Response("error", 400, "icon must be a valid url");
    }
  }

  try {
    const link = await linkModel.find({ _id: id });
    if (!link.length) {
      return Response("error", 400, "invalid link id provided");
    }
    // updates the link data
    const updatedLink = {
      ...link,
      ...linkData,
    };
    const result = await linkModel.findByIdAndUpdate(id, updatedLink, { new: true });
    return Response("success", 200, "Link updated successfully", result);
  } catch (error) {
    return Response("error", 500, (error.message ? error.message : error));
  }
};

exports.deleteLink = async function deleteLink(id) {
  try {
    const deletedLink = await linkModel.findByIdAndDelete(id);
    if (!deletedLink) {
      return Response("error", 400, "invalid link id provided");
    }
    return Response("success", 200, "link deleted successfully");    
  } catch (error) {
    return Response("error", 500, (error.message ? error.message : error));
  }
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

