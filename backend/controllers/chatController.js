import {
    generateResponse
}
from "../services/aiService.js";

import ChatHistory
from "../models/ChatHistory.js";



export const sendChat=async(req,res)=>{
    try{
        const {
            prompt
        }=req.body;

        if(!prompt){
            return res.status(400)
            .json({
                message:
                "Prompt is required"
            });
        }

        const aiResponse=
        await generateResponse(prompt);

        await ChatHistory.create({
            prompt,
            response:aiResponse
        });

        res.status(200)
        .json({
            success:true,
            data:{
                prompt,
                response:aiResponse
            }

        });
    }
    catch(error){
        const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error?.message ||
            error.message ||
            "AI processing failed";

        const statusCode =
            error.response?.status ||
            error.response?.data?.statusCode ||
            500;

        console.error(error.response?.data || error.message || error);

        res.status(statusCode)
        .json({
            success:false,
            message: errorMessage
        });
    }
};