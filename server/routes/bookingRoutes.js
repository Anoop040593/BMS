import express from "express";

import {
  getAllBookings,
  makePayment,
  bookShow,
} from "../controllers/bookingController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/make-payment", authMiddleware, makePayment);
router.post("/book-show", authMiddleware, bookShow);

router.get("/get-all-bookings", authMiddleware, getAllBookings);

export default router;
