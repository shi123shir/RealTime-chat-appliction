const  mongoose = require("mongoose");

const objectId = mongoose.Schema.Types.ObjectId

const messageModel = mongoose.Schema({
    sender:{
        type:objectId,
        ref:"User"
    },
    content:{
        type:objectId,
        trim : true
    },
     chat:{
        type: objectId,
        ref:"Chat"
     }
}, {timestamps: true})

module.exports = mongoose.model("Message",messageModel )