import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllSos,
  getAllCheckIns,
  getAllContacts,
  getOverview,
} from "../controllers/adminControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware, authorizeAdmin);
router.get("/overview", getOverview);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/sos", getAllSos);
router.get("/checkins", getAllCheckIns);
router.get("/contacts", getAllContacts);

export default router;
