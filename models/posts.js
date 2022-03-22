const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  post_id: {
    type: String
  },
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },  
  // date: {
  //   type: Date,
  //   required: true,
  // },
  img: {
    type: String,
    required: true,
    default: "placeholder image"
  },
  created_by: {
    type: String,
    required: true,
  },

  // fullname: {
  //   type: String,
  //   required: true,
  // }
});

module.exports = mongoose.model("Posts", postSchema);