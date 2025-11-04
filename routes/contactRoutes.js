import express from 'express';
import {
  createContact,
  getContacts,
  getContactsByUser,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);
router.get("/user/:userId", getContactsByUser);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;