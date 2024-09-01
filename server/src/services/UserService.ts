import { prisma } from "../lib/prisma";
import { CreateUserParams } from "../types";
import { AuthenticationService } from "./AuthenticationService";

export class UserService {
  static async createUser({ name, email, password }: CreateUserParams) {
    const userExist = await this.findUserByEmail(email);

    if (userExist) {
      throw new Error("This email has already been registered");
    }

    const password_encrypted = await AuthenticationService.encryptPassword(
      password
    );
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: password_encrypted,
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });

    return user;
  }

  static async signInUser(email: string, password: string){
    const userExist = await this.findUserByEmail(email);

    if(!userExist){
        throw new Error("User not found");
    }

    const password_checked = await AuthenticationService.checkPassword(password, userExist.password);

    if(!password_checked){
        throw new Error("Password invalid");
    }

    return AuthenticationService.generateToken(userExist.id)
  }

  static async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
