import app from "./app.js";
import dotenv from "dotenv";
import logger from "./configs/logger.config.js";

//dotenv config
dotenv.config();

//env variable
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  logger.info(`server is listening at ${PORT} port`);
});
