const express = require("express");
const {
  createContact,
  getContacts,
  getContactsByUser,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);
router.get("/user/:userId", getContactsByUser);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;