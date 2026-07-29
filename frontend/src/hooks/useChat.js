import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/chat/chatSlice";

const useChat = () => {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chat);

  const sendPrompt = (prompt) => {
    dispatch(sendMessage(prompt));
  };

  return {
    messages,
    loading,
    error,
    sendPrompt,
  };
};

export default useChat;
