import  mongoose  from "mongoose";

const schema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique:true
    },
    password: {
        type:String,
        require: true
    },
    email: {
        type: String,
        require: true,
        default: "Anonymous"
    },
    role: {
        type: Number,
        require: true,
        default: 1,
    },
    name:{
        type: String,
        require: true,
        default: "Anonymous"
    }
},
    {timestamps:true}
 );

 export const User = mongoose.model('User',schema);