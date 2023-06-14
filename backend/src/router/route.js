const express = require("express");
const route = express.Router();
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
const {accessChat,fetchChats} = require("../controller/chatControllers")

// user route
route.post("/user/register", registerUser);
route.post("/user/login", authUser);
route.get("/user/search", protect, allUsers);

// chat routes 
// for chaning route we can make route.route then chain
// route.route("/chat").post(protect,accessChat).get(proctect)example

route.post("/chat", protect, accessChat);// one and one chats

route.get("/chat", protect,fetchChats) // fetch all the chat of single user

// route.post("/chat/group", protect,createGroupChat)
// route.put("/chat/rename", protect,renameGroup)
// route.put("/chat/groupremove", protect,removeFromGroup)
// route.put("/chat/groupremove", protect,addToGroup)

module.exports = route;
