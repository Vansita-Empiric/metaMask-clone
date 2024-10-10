import { UserWallet } from "../model/userWallet.model.js";
import { EtherAccount } from "../model/etherAccount.model.js";
import { Transaction } from "../model/transaction.model.js";
import { ethers } from "ethers";

const newWallet = async (req, res) => {
  const wallet = ethers.Wallet.createRandom();
  const mnemonic = wallet.mnemonic.phrase;
  return mnemonic;
};

const newAccount = async (req, res) => {
  const wallet = ethers.Wallet.createRandom();

  const privateKey = wallet.privateKey;
  const publicKey = wallet.address;

  return { privateKey, publicKey };
};

const createUserWallet = async (req, res) => {
  const { password } = req.body;

  try {
    const seed = await newWallet();
    const uWallet = await UserWallet.create({
      seed_phrase: seed,
      password: password,
    });
    // console.log("User Wallet created successfully");
    res
      .status(201)
      .json({ message: "User Wallet created successfully", uWallet });
  } catch (error) {
    console.error("Error creating user wallet:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while creating user wallet" });
  }
};

const createEtherAccount = async (req, res) => {
  const id = req.params.id;
  const { name, initialBalance } = req.body;

  try {
    const { privateKey, publicKey } = await newAccount();

    const account = await EtherAccount.create({
      connectedWalletId: id,
      name: name,
      publicKey: publicKey,
      privateKey: privateKey,
      balance: initialBalance,
    });
    // console.log("Ether account created successfully");
    res
      .status(201)
      .json({ message: "Ether account created successfully", account });
  } catch (error) {
    console.error("error creating ether account: ", error);
    res
      .status(500)
      .json({ message: "Somenthing went wrong while creating account" });
  }
};

const getConnectedAccounts = async (req, res) => {
  const findById = await EtherAccount.find({ connectedWalletId: req.params.id });
  if (!findById) {
    return console.log("No account found");
  }
  console.log(findById);
  return res.status(200).json({ message: "Account found", findById });
};

const transactionData = async (req, res) => {
  const id = req.params.id;
  const { receiver, amount } = req.body;

  try {
    const findSender = await EtherAccount.findOne({ _id: req.params.id });
    if(!findSender) {
      // console.log("Sender not found");
      return res.status(404).json({ message: "Sender not found" });
    }
    // console.log("balance-------------", findSender.balance);

    if(findSender.balance < amount) {
      // console.log("Insufficient balance");
      return res.status(400).json({ message: "Insufficient balance" });
    }

    if(findSender.publicKey == receiver) {
      // console.log("Sender and receiver are same");
      return res.status(400).json({ message: "Sender and receiver are same" });
    }

    const transaction = await Transaction.create({
      sender: findSender.publicKey,
      receiver: receiver,
      amount: amount,
    });

    const newBalanceOfSender = findSender.balance - amount;

    const updatedBalanceOfSender = await EtherAccount.findOneAndUpdate(
      { _id: id },
      { balance: newBalanceOfSender },
      { new: true }
    );

    const findReceiver = await EtherAccount.findOne({ publicKey: receiver });
    const newBalanceOfReceiver = Number(findReceiver.balance) + Number(amount);

    if(findReceiver) {  
      const updatedBalanceOfReceiver = await EtherAccount.findOneAndUpdate(
        { publicKey: receiver },
        { balance: newBalanceOfReceiver },
        { new: true }
      );
      // console.log("New balance of receiver :------------------ ", updatedBalanceOfReceiver);
    }

    // console.log("New balance of sender :------------------ ", updatedBalanceOfSender);

    return res
    .status(200)
    .json({ message: "Transaction successful", transaction });
  } catch (error) {
    console.error("error finding sender: ", error);
    res
      .status(500)
      .json({ message: "Somenthing went wrong while finding sender" });
  }
}

export { createUserWallet, createEtherAccount, getConnectedAccounts, transactionData };
