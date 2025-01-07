import app from "./app.js";
import dotenv from "dotenv";
import logger from "./configs/logger.config.js";

//dotenv config
dotenv.config();

//env variable
const PORT = process.env.PORT || 9000;

let server = app.listen(PORT, () => {
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
