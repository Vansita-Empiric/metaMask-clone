import { Router } from "express";
import {
    createUserWallet,
    createEtherAccount,
    getConnectedAccounts,
    transactionData
  } from "../controller/userWallet.controller.js";
  
const router = Router();

router.post("/create", createUserWallet);
router.post("/createAccount/:id", createEtherAccount);
router.post("/transaction/:id", transactionData);
router.get("/getConnectedAccounts/:id", getConnectedAccounts);

export default router;
