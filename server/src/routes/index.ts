import express from "express";
import colorRoutes from "./colorRoutes";
import taskRouter from "./taskRoutes";
import userRouter from "./userRoutes";

const router = express.Router();

router.use("/", userRouter);
router.use("/tasks", taskRouter);
router.use("/colors", colorRoutes);

export default router;
