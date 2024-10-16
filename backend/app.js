import connectDB from "./db/index.js";
import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";

const app = express();

dotenv.config({
    path: './.env'
})

app.use(cors({
    origin: process.env.CORS_ORIGIN_ONE,
    credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.route.js'
import listingRouter from "./routes/listing.route.js"
import reviewRouter from "./routes/review.route.js"


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/listings", listingRouter)
app.use("/api/v1/reviews", reviewRouter)

connectDB()
app.use(errorMiddleware);


export { app }
