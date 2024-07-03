import e, { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../../../application/interfaces/usecase.interface";
import { CustomeError } from "../../../utils/errors/CustomeErr";
import { generateJWTtoken } from "../../../utils/jwt/generateToken";

export class UserRegisterController {
  private userUsecase: IUserUseCase;
  constructor(useCase: IUserUseCase) {
    this.userUsecase = useCase;
  }
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      let user = await this.userUsecase.checkUserWithEmail(email as string);
      if (user) {
        throw new CustomeError(
          "User already exist with this email",
          409,
          "Conflict"
        );
      }
      user = await this.userUsecase.createUserUsecase(req.body);
      const token = generateJWTtoken({ id: user.id });
      res.cookie(process.env.VERIFIED_COOKIE_NAME as string, token);
      return res
        .status(201)
        .json({ status: true, message: "User created!!", user });
    } catch (error) {
      next(error);
    }
  }
}
