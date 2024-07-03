import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../../../application/interfaces/usecase.interface";

export class UserRegisterController {
  private userUsecase: IUserUseCase;
  constructor(useCase: IUserUseCase) {
    this.userUsecase = useCase;
  }
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password } = req.body;
      let user = await this.userUsecase.checkUserWithEmail(email as string);
    } catch (error) {
      next(error);
    }
  }
}
