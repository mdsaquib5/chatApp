import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
        message: String,
    },
    { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);