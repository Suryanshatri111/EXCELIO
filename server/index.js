import dotenv from "dotenv";
import connectdb from "./Config/db.js";
import { app } from "./app.js";

dotenv.config({});
const port = process.env.PORT;

connectdb()
  .then(() => {
    app.listen(process.env.port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
