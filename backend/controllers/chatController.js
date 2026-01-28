import Chat from "../models/chatModel.js";

export const sendChat = async (req, res) => {
  const { message } = req.body;
  const { userId, username } = req.user;

  const chat = await Chat.create({
    userId,
    username,
    message,
  });

  res.status(201).json(chat);
};