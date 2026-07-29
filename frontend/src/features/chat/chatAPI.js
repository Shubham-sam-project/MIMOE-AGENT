import api from "../../services/api";

export const sendChatRequest = async (prompt) => {
  const response = await api.post("/chat", {
    prompt,
  });

  return response.data.data;
};
