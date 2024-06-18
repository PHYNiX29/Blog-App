import express from "express";
import { User } from '../models/user.model.js';
import { Post } from '../models/post.model.js';
import { authenticateToken } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// post a post
router.post('/post', authenticateToken, async (req, res) => {
    console.log("/post fetched");
    try {
        const { title, content } = req.body;
        const user = await User.findOne({email:req.user._id});
        const time = new Date();
        const newPost = await Post.create({authorId:user._id,title:title,content:content,createdAt:time });
        res.status(201).json(newPost);
    }catch (error) {
        res.status(400).send('Error creating post');
    }
});

// fetch all posts
router.get('/posts', async (req, res) => {
    console.log('/posts fetched');
    try {
        const authorId = req.query.authorId;
        let posts;
        if (authorId) {
            posts = await Post.find({ authorId: authorId }).select('authorId title content createdAt');
        } else {
            posts = await Post.find({}).select('authorId title content createdAt');
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({message:'Error fetching posts'});
    }
})

router.get('/dashboard', authenticateToken, async (req, res) => {
    console.log("/dashboard");
    try {
        const posts = await Post.find({authorId:req.user._id}).select('authorId title content createdAt');
      res.json(posts);
    } catch (error) {
      res.status(400).send('Error fetching user posts');
    }
});


export default router;