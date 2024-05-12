import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";
import cloudinary from 'cloudinary';
import database from "./config/db.js";
import courseRoutes from "./routes/course.routes.js"
config();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const PORT = process.env.PORT;
console.log(PORT)
database()

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}));
app.use(cookieParser());


app.use(morgan('dev'));

app.use('/api/auth/user', userRoutes);
app.use('/api/auth/courses', courseRoutes);


// app.use('/ping', (req, res) => {
//     res.send('/pong');
// });








//-------------------------------------Deployment------------------------------------//



app.use(express.static(path.join(__dirname, '/frontend/dist')))





app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});




//-------------------------------------Deployment------------------------------------//

app.listen(PORT, () => {
    console.log(`App is running on PORT:${PORT}`);
});


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

