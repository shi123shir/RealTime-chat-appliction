
const User = require("../model/userModel")
const generateToken = require("../config/generateToken");


const registerUser = async (req,res) => {
    try {
           const { name, email, password, pic } = req.body;

           if (!name || !email || !password) {
             res.status(400);
             throw new Error("please Enter all the Feilds");
           }

           const userExist = await User.findOne({ email });
           if (userExist) {
             res.status(400);
             throw new Error("User already exists");
           }

           const user = await User.create({
             name,
             email,
             password,
             pic,
           });
           if (user) {
             return res.status(201).send({
               _id: user._id,
               name: user.name,
               email: user.email,
               pic: user.pic,
               token: generateToken(user._id),
             });
           } else {
             throw Error("Failed to Create the User");
           }
    } catch (error) {
        res.status(500);
        throw Error(error.message)  
    }
 
}

const authUser = async (req,res) =>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email});

           if (user && (await user.matchPassword(password)) ) {
             return res.status(201).send({
               _id: user._id,
               name: user.name,
               email: user.email,
               pic: user.pic,
               token: generateToken(user._id),
             });
           } else {
             throw Error("Invalid Email or Password");
           }
    } catch (error) {
        res.status(500);
        throw Error(`server error => ${error.message}`)
    }
}

const allUsers = async()=>{
try {
     const keyword = req.query.search?{
      $or : [
        {
          name: {$regex: req.query.search, $options:"i"}
        },
        {
          email:{$regex: req.query.search, $options: "i"}
        }
      ]
     }:{};

     const users = await User.find(keyword).find({_id : req.user._id})

     return res.status(200).send(users)
} catch (error) {
      res.status(500);
      throw Error(`server error => ${error.message}`);
}
}

module.exports = { registerUser, authUser,allUsers}