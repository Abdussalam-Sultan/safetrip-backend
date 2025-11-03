import express from "express";
import Tip from "../models/Tip.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tips = await Tip.findAll({ attributes: ["id", "title", "content"] });
    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tips" });
  }
});

export default router;
