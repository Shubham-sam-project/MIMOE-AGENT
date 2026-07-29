import mongoose from "mongoose";


const chatSchema=new mongoose.Schema(
    {
        prompt:{
            type:String,
            required:true
        },
        response:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    {
        timestamps:true
    }
);

const ChatHistory=
mongoose.model(
    "ChatHistory",
    chatSchema
);


export default ChatHistory;