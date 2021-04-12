import mongoose, { Schema } from "mongoose";

export const ContactSchema = new Schema(
  {
    name: String,
    phone: Number,
    email: String,
  },
  { collection: "contacts" }
);

export default mongoose.model("Contact", ContactSchema);
