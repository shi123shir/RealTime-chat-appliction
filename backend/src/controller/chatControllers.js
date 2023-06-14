const Chat = require("../model/chatModel")
const User = require("../model/userModel")


const accessChat = async (req,res)=>{

    try {
        
          const { userId } = req.body;

          if (!userId) {
            console.log("UserId param not sent with request");
            return res.sendStatus(400);
          }

          var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
              { users: { $elemMatch: { $eq: req.user._id } } },
              { users: { $elemMatch: { $eq: userId } } },
            ],
          })
            .populate("users", "-password")
            .populate("latestMessage");

          isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name pic email",
          });

          if (isChat.length > 0) {
            res.send(isChat[0]);
          } else {
            var chatData = {
              ChatName: "sender",
              isGroupChat: false,
              users: [req.user._id, userId],
            };
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({
              _id: createdChat._id,
            }).populate("users", "-password");
            res.status(201).send(FullChat);
          }
    } catch (error) {
        res.status(500);
        throw Error(error.message)
    }

}

const fetchChats = async (req, res) => {
try {
    
} catch (error) {
    
}
}

module.exports = {accessChat, fetchChats}