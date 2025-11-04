import express from "express";
import { addContact, getUserContacts, deleteContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", addContact);  
router.get("/", getUserContacts); 
router.delete("/:id", deleteContact);   

export default router;
