import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import authRoute from "./src/routes/authRoutes.js";
import postsRoute from "./src/routes/postsRoute.js";
import connectDB from "./src/db/mongoose.js";
import logoutRoute from "./src/routes/logoutroute.js";
import { authenticateToken } from "./src/middleware/authMiddleware.js";



const app = express();
app.set('trust proxy' , 20);
app.get('/ip', (request, response) => response.send(request.ip));
app.get('/x-forwarded-for', (request, response) => response.send(request.headers['x-forwarded-for']));
app.use(cors());
app.use(express.json());


connectDB();
dotenv.config();



app.post("/authenticated",authenticateToken,(req,res)=>{
    console.log("/ fetched");
    console.log(req.body);
    res.status(200).json({message:"hell yeah"})
})


app.use(helmet.noSniff());
app.use(helmet.referrerPolicy({ policy: "no-referrer" }));


app.use(authRoute);
app.use(postsRoute);
app.use(logoutRoute);

function startServers() {
    const port = 8000;
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
}
startServers();

