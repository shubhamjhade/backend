import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userschema = new Schema({
 username:{
    type:String,
  required:true,
  unique:true,
  lowercase:true,
  trim:true,
  index:true,
 },
 email:{
    type:String,
  required:true,
  unique:true,
  lowercase:true,
  trim:true,
 },
 email:{
    type:String,
  required:true,
  trim:true,
  index:true,
 },
 password:{
    type:String,
  required:true,
  trim:true,
 }
, 
avatar:{
 type:String,
 required:true,
},
coverimage:{
    type:String,
}
,
watchhisory:[
    {
    type:Schema.Types.ObjectId,
    ref:"video"
    }
],

password:{
    type:String,
    required:[true,"password is required"],
    
},
referencetoken:{
type:String
}

 },
 {
    timestamps:true
 }
)

userschema.pre("save",async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password,10);
  next();
})

userschema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password);
}

export const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRE || "15m" }
    );
};

// Generate Refresh Token
export const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email }, 
        process.env.JWT_REFRESH_SECRET, 
        { expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d" }
    );
};

export const User = mongoose.model("User",userschema)