import mongoose from "mongoose";
import { UserWallet } from "./userWallet.model.js";

const etherAccountSchema = new mongoose.Schema(
  {
    connectedWalletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserWallet",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
      unique: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const EtherAccount = mongoose.model("EtherAccount", etherAccountSchema);

export { EtherAccount };
