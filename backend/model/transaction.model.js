import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: true,
        },
        receiver : {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export { Transaction };