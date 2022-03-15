require("dotenv").config;
const express = require("express");
const posts = require("../models/posts");
const auth = require("../middleware/auth");
const { getPost } = require("../middleware/finders");
const app = express.Router();

// GET all posts
app.get("/", auth, async (req, res) => {
  try {
    const post = await posts.find();
    res.status(201).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// GET one post
app.get("/:id", [auth, getPost], (req, res, next) => {
  res.send(res.post);
});

// CREATE a post
app.post("/", auth, async (req, res, next) => {
  const {title, description, img, fullname } = req.body;
  let post;
  img
    ? (post = new posts({
      title, 
      description, 
      img, 
      created_by: req.user._id,
      fullname,
      
      }))
    : (post = new posts({
      title,
      description,  
      img,
      created_by: req.user._id,
      fullname,
      }));

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a post
app.put("/:id", [auth, getPost], async (req, res, next) => {
    res
      .status(400)
      .json({ message: "You do not have the permission to update this post" });
  const { title, description, img, fullname } = req.body;
  if (fullname) res.post.fullname = fullname;
  if (title) res.post.title = title;
  if (description) res.post.description = description;
  if (img) res.post.img = img;
  try {
    const updatedPost = await res.post.save();
    res.status(201).send(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  
  }
});

// DELETE a post
app.delete("/:id", [auth, getPost], async (req, res, next) => {
  // if (req.user._id !== req.post.created_by)
    // res
    //   .status(400)
    //   .json({ message: "You do not have the permission to delete this post" });
  try {
    await res.post.remove();
    res.status(201).json({ message: "Deleted post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = app;
