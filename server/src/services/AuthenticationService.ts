import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export class AuthenticationService {
  static async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(12);
    const passwordEncrypted = await bcrypt.hash(password, salt);

    return passwordEncrypted;
  }

  static async checkPassword(password: string, password_encrypted: string) {
    const check_password = await bcrypt.compare(password, password_encrypted);

    return check_password;
  }

  static async generateToken(id: string) {
    const token = jsonwebtoken.sign(
      {
        id,
      },
      String(process.env.SECRET),
      {
        expiresIn: "12h",
      }
    );

    return token;
  }
}
