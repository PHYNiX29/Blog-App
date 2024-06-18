import express from 'express';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { authenticateToken, generateJwtToken, generateRefreshToken } from '../middleware/authMiddleware.js';
import { userLoginSchema,userRegistrationSchema } from '../schemas/user.schema.js';
import { User } from '../models/user.model.js';
// import sendMail from '../utils/email.js'; 
// import { object } from 'zod';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const router = express.Router();
app.use(bodyParser.json());
// console.log(process.env.SALT_ROUNDS);


const signUpQue = [];
let signUpIsLocked = false;
let currentSignUp = [];

router.post('/signup', async (req, res) => {
    console.log("/signup");
    console.log(req.body);
    res.clearCookie("G_ENABLED_IDPS");
    const userReq = req.body
    if (signUpIsLocked) {
            signUpQue.push(userReq);
    }
    else{
        signUpIsLocked = true;
        currentSignUp.push(userReq);
        const result = await signUp(userReq);
        res.json(result);
    }

    while (signUpQue.length > 0) {
        const next_data = signUpQue.shift();
        const result_qued = await signUp(next_data);
        res.json(result_qued);
    }

    signUpIsLocked = false;

    
    // console.log("request body: ", req.body);
    async function signUp(userData){
        try {
            // const userData = userRegistrationSchema.parse(req.body);
            console.log(userData);
            const existingUser = await User.findOne({ email: userData.email });
    
            if (Object.values(userData).includes("")) {
                return { err: "Fill all details" };
            }
    
            else if (existingUser) {
                return { err: 'Username already has an account associated with it, please login' };
            }
            
            else{
                const hash = await bcrypt.hash(userData.password,10);

                const newUser = await User.create({
                    email: userData.email,
                    password: hash,
                });
            
                return { redirect: 'login' };
    
            }
    
        }
        catch (error) {
            console.error('Signup error:', error);
            res.status(400).json({ error: error.errors || 'Invalid data' });
        }
    }
});


router.post('/login', async (req, res) => {
    res.clearCookie("G_ENABLED_IDPS");
    console.log("/login");

    try {
        // const zodCheck = userLoginSchema.parse(req.body);
        const userData = req.body;

        const user = await User.findOne({ email: userData.email });
        
        // Empty field check
        if (Object.values(userData).includes("")) {
            return res.status(400).json({ err: "Fill all details" });
        }

        // No user or team found
        else if (!user) {
            return res.status(400).json({ err: "Invalid Details" });
        }

        else{
            bcrypt.compare(userData.password, user.password, (err, result) => {
                if (result) {
                    const accessToken = generateJwtToken({ _id: user._id });
                    // const refreshToken = generateRefreshToken({ _id: user.email});
                    // res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: 'None', secure: true });
                    // res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: 'None', secure: true });
                    console.log("Logged in");
                    res.status(200).json({ accessToken });
    
                } else {
                    console.error(err);
                    res.status(400).json({ err: "Invalid Details" });
                }
            });
        }
        
    } catch (error) {
        console.log("a")
        res.json({ err: "Invalid Details" });
    }
    
});

router.post('/refresh', (req, res) => {
    const { accessToken, refreshToken } = req.body;

    jwt.verify(refreshToken, process.env.ENCRYPT_KEY || 'your_default_secret_key', (err, decoded) => {
        if (err) {
            console.log("Refresh key doesn't match");
            return res.status(401).json({ message: 'Invalid refresh token' });
        } else {
            const newAccessToken = generateJwtToken({ _id: decoded.username, role: decoded.role });

            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");

            res.cookie("accessToken", newAccessToken, { httpOnly: true, sameSite: "strict" });
            res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" });

            res.redirect("/home");
        }
    });
});

export default router;