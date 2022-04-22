// all the models come in here
const linkModel = require("./schema");

async function createNewLink() {
  let linkTitle = req.body.linkTitle;
  let linkUrl = req.body.linkUrl;
  function check(linkTitle, linkUrl) {
    let linkTitleDuplicate = linkModel.find((link) => link.title == linkTitle);
    let linkUrlDuplicate = linkModel.find((link) => link.Url == linkUrl);
    if (!linkUrlDuplicate || !linkTitleDuplicate) {
      return 1;
    } else {
      return 0;
    }
  }

  if (check == 1) {
    try {
      const newLink = new linkModel({
        id,
        author,
        title,
        description,
        url,
        icon,
        privacy,
      });

      const result = await newLink.save();
      return result;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("link title or link url exists already");
  }
}

async function updateLink(id) {
  const id = id;
  const findId = linkModel.find((link) => link.id == id);
  if (!findId) {
    console.log("Error: Link doesnt exist");
  } else {
    try {
      let updatedLink = {
        author,
        title,
        description,
        url,
        icon,
        privacy,
      };
      const result = await linkModel.findByIdAndUpdate(id, updatedLink);
      return result;
    } catch (error) {}
  }
}

async function deleteLink(id) {
  await linkModel
    .findByIdAndDelete(id)
    .then((res) => console.log("Deleted!"))
    .catch((err) => console.log(err));
}

async function getAllLink(author) {
  const result = await linkModel.find({ author: author });
  return result;
}
