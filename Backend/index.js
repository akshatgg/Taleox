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
config();

const app = express();
const PORT = process.env.PORT;
console.log(PORT)
database()


app.use(express.json());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());


app.use(morgan('dev'));

app.use('/api/auth/user', userRoutes);

app.use("/", (req, res) => {
    res.send("api running successfull");
});
app.use('/ping', (req, res) => {
    res.send('/pong');
});








//-------------------------------------Deployment------------------------------------//


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, '/Backend/frontend/dist')))





app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname1, "/Backend/frontend/dist/index.html"));
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

