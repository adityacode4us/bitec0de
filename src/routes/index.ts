import express from "express";
import { IdentifyContactsController } from "../controllers/index.js";

const router = express.Router();

router.get("/identify", IdentifyContactsController.identifyContacts);
export default router;
