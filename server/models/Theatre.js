import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isActive: { type: Boolean, default: false },
  },
  { timeStamps: true },
);

const Theatre = mongoose.model("theatres", theatreSchema);
export default Theatre;
