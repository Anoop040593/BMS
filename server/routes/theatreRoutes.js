import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  addTheatre,
  getAllTheatres,
  getMyTheatres,
  approveTheatre,
} from "../controllers/theatreController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
const theatreRouter = express.Router();

theatreRouter.post("/add-theatre", authMiddleware, addTheatre);
theatreRouter.get("/get-my-theatre", authMiddleware, getMyTheatres);

//admin routes
theatreRouter.get(
  "/get-all-theatres",
  authMiddleware,
  adminMiddleware,
  getAllTheatres,
);
theatreRouter.put(
  "/approve-theatres",
  authMiddleware,
  adminMiddleware,
  approveTheatre,
);
export default theatreRouter;
