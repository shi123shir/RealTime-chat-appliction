const mongoose = require("mongoose");

const objectId = mongoose.Schema.Types.ObjectId;

const chatModel = mongoose.Schema({
  chatName: {
    type: String,
    trim: true,
  },

  isGroupChat: {
    type: Boolean,
    default: false,
  },
  users: [
    {
      type: objectId,
      ref: "Users",
    },
  ],
  latestMessage:{
     type:objectId,
     ref:"Message"
  },
  groupAdmin :{
    type:objectId,
    ref:"User",
  }
},{timestamps:true});

module.exports = mongoose.model("Chat", chatModel);

