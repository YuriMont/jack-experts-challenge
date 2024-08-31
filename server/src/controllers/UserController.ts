import { Request, Response } from "express";
import { z } from "zod";
import { UserService } from "../services/UserService";

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const registerUserSchema = z
        .object({
          name: z.string(),
          email: z.string().email(),
          password: z
            .string()
            .min(8, "This field must have at least 8 characters"),
          confirm_password: z.string(),
        })
        .refine((data) => data.password === data.confirm_password, {
          message: "Passwords don't match",
          path: ["confirm_password"],
        });

      const { name, email, password } = registerUserSchema.parse(req.body);

      const user = await UserService.createUser({
        name,
        email,
        password,
      });

      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(400).json(error);
    }
  }

  static async signin(req: Request, res: Response) {
    try {
      const signInSchema = z.object({
        email: z.string().email(),
        password: z
          .string()
          .min(8, "This field must have at least 8 characters"),
      });

      const { email, password } = signInSchema.parse(req.body);

      const token = await UserService.signInUser(email, password);

      return res.status(200).json(token);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(400).json(error);
    }
  }
}
