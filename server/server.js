import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import UserRoutes from "./routes/userRoutes.js";
import movieRouter from "./routes/movieRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); //If it is cors() => Then allow everyone.
app.use(express.json());

app.use("/api/user", UserRoutes);
app.use("/api/movie", movieRouter);

app.get("/health", (req, res) => {
  res.send("Server is running");
});

// app.use("*", (req, res) => {
//   res.send("Incorrect Route!");
// });
// console.log(process.env);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
