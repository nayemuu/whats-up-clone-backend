import app from "./app.js";
import dotenv from "dotenv";

//dotenv config
dotenv.config();

//env variable
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT} port`);
});
