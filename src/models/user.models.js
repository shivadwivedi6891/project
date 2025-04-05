import mongoose, {Schema} from 'mongoose';
import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs"
import * as bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
      
        userName:{
           type:String,
           required:true,
           unique:true,
           lowercase:true,
           trim:true,
           Index:true

        },
        email:{
           type:String,
           required:true,
           unique:true,
           lowercase:true,
           trim:true,
           
        },
        
        fullName:{
           type:String,
           required:true,
           trim:true,
           index:true
           
        },
        avatar:{
           type:String, //cloudenary url

           required:true,
           trim:true,
           
           
        },
        coverImage:{
            type:String //cloud
        },

        watchHistory: [
           {
            type: Schema.Types.ObjectId,
            ref: "video" 
           }
        ],

        password:{
            type:String,
            required:[true,"password is required"]
        },
        refreshToken:{
          type:String
        }


    },{timestamps:true}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){

   return await bcrypt.compare(password,this.password)

}

userSchema.methods.generateAccessToken=function(){

   return jwt.sigh({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName,


    },
    process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)

}
userSchema.methods.generateRefreshToken=function(){
   return jwt.sign({
    _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName,


    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
   )
}

export const User = mongoose.model("User",userSchema)