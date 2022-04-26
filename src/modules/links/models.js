
// all the models come in here
const mongoose = require("mongoose");
const { linkSchemaValidator, linkSchema } = require("./schema");
const { validateData } = require("../../utils/validator");
const Response = require("../../utils/response");

const linkModel = mongoose.model("Link", linkSchema);

async function isUniqueLink(link, author) {
  let link = await linkModel.find({
    $and: [{ author: author }, { link: link }],
  });
  if (!link) {
    return true;
  }
  return false;
}

exports.getLLinkById = async function getLinkById(id) {
  const result = await linkModel.find({ _id: id });
  if (!result) {
    return Response("error", 400, "invalid link id provided");
  }
  return Response("success", 201, "fetched link successfully", result);
};

exports.createNewLink = async function createNewLink(link) {
  let validatedData = validateData(link, linkSchemaValidator);

  // if the link data is not valid, return an error response
  if (!validatedData.isValid) {
    return Response("error", 400, validatedData.error);
  }

  if ((!isUniqueLink(link.url), link.author)) {
    return Response("error", 400, " Link already exists");
  }

  const newLink = new linkModel(link);
  newLink
    .save()
    .then((result) => {
      return Response("success", 201, "Link created successfully", result);
    })
    .catch((error) => {
      return Response("error", 500, error);
    });
};

exports.updateLink = async function updateLink(id, linkData) {
  if (linkData.url) {
    if (!isUniqueLink(linkData.url, linkData.author)) {
      return Response(
        "error",
        400,
        "This link already exists with this author "
      );
    }
  }

  const link = linkModel.find({ _id: id });
  if (!link) {
    return Response("error", 400, "invalid link id provided");
  }
  try {
    // updates the link data
    const updatedLink = {
      ...link,
      ...linkData,
    };
    const result = await linkModel.findByIdAndUpdate(id, updatedLink);
    return Response("success", 201, "Link updated successfully", result);
  } catch (error) {
    return Response("error", 500, error);
  }
};

exports.deleteLink = async function deleteLink(id) {
  const deletedLink = await linkModel.findByIdAndDelete(id);
  if (!deletedLink) {
    return Response("error", 400, "invalid link id provided");
  }
  return Response("success", 200, "link deleted successfully");
};

exports.getAllLinks = async function getAllLink(author) {
  const result = await linkModel.find({
    author: author,
  });
  return Response(
    "success",
    201,
    "fetched all links relating to this author successfully",
    result
  );
};

