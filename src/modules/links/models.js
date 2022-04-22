// all the models come in here
const linkModel = require("./schema");

async function createNewLink() {
  let linkTitle = req.body.linkTitle;
  let linkUrl = req.body.linkUrl;
  let linktitleDuplicate = linkModel.find((link) => link.title == linkTitle);
  let linkUrlDuplicate = linkModel.find((link) => link.Url == linkUrl);
  if (!linktitleDuplicate || !linkUrlDuplicate) {
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

      await newLink.save();
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
       let  updatedLink= {
        author,
        title,
        description,
        url,
        icon,
        privacy,

       } 
       const result = await linkModel.findByIdAndUpdate(id, updateLink );
       console.log(result)
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
    const result = await linkModel.find({author: author})
    console.log(result)
    
}

