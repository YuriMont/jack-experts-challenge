import { Request, Response } from "express";
import { z } from "zod";
import ColorServices from "../services/ColorServices";

export default class ColorsController {
  static async getAllColors(req: Request, res: Response) {
    try {
      const colors = await ColorServices.getAllColors();

      return res.status(200).json(colors);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async createColor(req: Request, res: Response) {
    try {
      const createColorSchema = z.object({
        name: z.string(),
        code: z.string()
      })

      const { name, code } = createColorSchema.parse(req.body);

      const color = await ColorServices.createColor(name, code);

      return res.status(200).json(color);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
