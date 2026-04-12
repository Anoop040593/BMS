import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRoutes from "./routes/userRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api/user", UserRoutes);

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
