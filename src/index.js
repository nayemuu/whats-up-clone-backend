import app from "./app.js";
import dotenv from "dotenv";
import logger from "./configs/logger.config.js";
import mongoose from "mongoose";

//dotenv config
dotenv.config();

//env variable
const PORT = process.env.PORT || 9000;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    logger.info("connected to mongoDB");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

let server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`server is listening at ${PORT} port`);
});

//handle server errors
const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  }
});
