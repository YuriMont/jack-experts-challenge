import { prisma } from "../lib/prisma";

export default class ColorServices {
  static async getAllColors() {
    return await prisma.color.findMany();
  }

  static async createColor(name: string, code: string) {
    const color = await prisma.color.create({
      data: {
        name,
        code,
      },
    });

    return color;
  }
}
