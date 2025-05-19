import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//
import usersRoutes from "./Routes/usersRoutes.js";
import excelRoutes from "./Routes/excelRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

//routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/excels", excelRoutes);
app.use("/api/v1/admin", adminRoutes);
export { app };
