import mongoose from "mongoose";

const userWalletSchema = new mongoose.Schema(
  {
    seed_phrase: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserWallet = mongoose.model("UserWallet", userWalletSchema);
