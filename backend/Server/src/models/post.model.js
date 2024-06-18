import mongoose from "mongoose";
import { type } from "os";

const postSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt:{ type: Date, required:true }
});

export const Post = mongoose.model("Post", postSchema);