import express, { Router } from "express";
import UxInsights from "./uxInsights";

const router: Router = express.Router();

router.use("/ux-insights", UxInsights);

export default router;
