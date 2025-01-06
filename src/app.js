import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
//dotenv config
dotenv.config();

//create express app
const app = express();

//morgan for show endpoits hit status and processing time
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//helmet for security
app.use(helmet());

//parse json request body
app.use(express.json());

//parse form data
app.use(express.urlencoded({ extended: true }));

//sanitize request data
app.use(mongoSanitize());

//enable cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome");
});

export default app;
