import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import walletRouter from "./routes/wallet.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors()
);

app.use(express.json());
app.use(cookieParser());

app.use("/", walletRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8008, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed \n", err);
  });
