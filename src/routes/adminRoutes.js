import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllSos,
  getAllCheckIns,
  getAllContacts,
  getOverview,
  createTip,
  getAllTips,
  updateTip,
  deleteTip,
} from "../controllers/adminControllers.js";
import { authorizeAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authorizeAdmin);
router.get("/overview", getOverview);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/sos", getAllSos);
router.get("/checkins", getAllCheckIns);
router.get("/contacts", getAllContacts);

router.post("/tips", createTip);
router.get("/tips", getAllTips);
router.put("/tips/:id", updateTip);
router.delete("/tips/:id", deleteTip);

export default router;
