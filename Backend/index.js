import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import userpayment from "./routes/payment.routes.js"
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";
import cloudinary from 'cloudinary';
import database from "./config/db.js";
import courseRoutes from "./routes/course.routes.js"
config();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import Razorpay from 'razorpay';
const app = express();
const PORT = process.env.PORT;
console.log(PORT)
database()


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization');
    next();
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors({
//     origin: [process.env.CLIENT_URL],
//     credentials: true
// }));
app.use(cookieParser());


app.use(morgan('dev'));

app.use('/api/auth/user', userRoutes);
app.use('/api/auth/courses', courseRoutes);
app.use('/api/auth/Payment', userpayment);



// app.use('/ping', (req, res) => {
//     res.send('/pong');
// });


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_PLAN_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

export default razorpay;







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


