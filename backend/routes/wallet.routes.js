import { Router } from "express";
import {
    createUserWallet,
    createEtherAccount,
    transactionData
  } from "../controller/userWallet.controller.js";
  
const router = Router();

router.post("/create", createUserWallet);
router.post("/createAccount/:id", createEtherAccount);
router.get("/transaction/:id", transactionData);

export default router;
