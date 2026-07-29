import apiClient from "../utils/apiClient.js";


export const generateResponse=async(prompt)=>{


    const model = process.env.MIMOE_MODEL;
    if (!model) {
        throw new Error("MIMOE_MODEL is required and must be set to a valid mimOE model name.");
    }

    let response;
    try {
        response = await apiClient.post(
            "/chat/completions",
            {
                model,
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful AI assistant."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7
            }
        );
    } catch (error) {
        const apiError =
            error.response?.data?.message ||
            error.response?.data?.error?.message ||
            error.message ||
            "AI request failed";
        throw new Error(apiError);
    }

    return response.data.choices[0].message.content;


};