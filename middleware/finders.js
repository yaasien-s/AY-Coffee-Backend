// This is used to find various Schemas
const Users = require("../models/users");
const Products = require("../models/products");
const Posts = require("../models/posts")

async function getUser(req, res, next) {
  let user;
  try {
    user = await Users.findById(req.params.id);

    if (!user) res.status(404).json({ message: "Could not find user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

async function getPost(req, res, next) {
  let post;
  try {
    post = await Posts.findById(req.params.id);
    if (!post) res.status(404).json({ message: "Could not find post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.post = post;
  next();
}

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Products.findById(req.params.id);
    if (!product) res.status(404).json({ message: "Could not find product" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.product = product;
  next();
}

module.exports = { getUser, getProduct, getPost };
