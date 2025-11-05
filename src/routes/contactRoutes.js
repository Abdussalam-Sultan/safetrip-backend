import express from "express";
import { addContact, getUserContacts, deleteContact, updateContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", addContact);  
router.get("/", getUserContacts); 
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);   

export default router;
