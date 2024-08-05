import express from "express";
import { paymentController } from "../controllers/orderController.js";
import { verifyjwt } from "../middleware/auth.js";

const router = express.Router();

router.route("/checkout").post(verifyjwt, paymentController);

export default router;
