import express, { Router } from "express";
import { uxInsightsController } from "../controllers";

const router: Router = express.Router();

router.post("/", uxInsightsController.getUXInsights);

export default router;
