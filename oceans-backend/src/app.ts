import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;
