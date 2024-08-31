import express from "express";
import ColorsController from "../controllers/ColorsController";

const colorRoutes = express.Router();

colorRoutes.get("/", ColorsController.getAllColors);
colorRoutes.post("/", ColorsController.createColor)

export default colorRoutes;