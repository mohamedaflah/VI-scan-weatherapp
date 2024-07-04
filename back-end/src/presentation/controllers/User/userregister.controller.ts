import e, { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../../../application/interfaces/usecase.interface";
import { CustomeError } from "../../../utils/errors/CustomeErr";

import { hashPassword } from "../../../utils/security/hashPassword";
import { nodeCache } from "../../../config/node-cache.config";
import { generateVerficationLink } from "../../../utils/common/generateVerificationLink";
import { sendVerficationLink } from "../../../infra/nodemailer/sendVerficationLink";
import { comparePassword } from "../../../utils/security/comparePassword";

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
      // user = await this.userUsecase.createUserUsecase(req.body);
      // const token = generateJWTtoken({ id: user.id });
      // res.cookie(process.env.VERIFIED_COOKIE_NAME as string, token);
      req.body.password = await hashPassword(String(req.body.password));

      nodeCache.set(email, req.body);
      console.log(req.body);

      const verificationlink = generateVerficationLink(email, "qrt");
      sendVerficationLink(email, verificationlink);
      return res.status(201).json({
        status: true,
        message: "Verification link has been sended",
        link: verificationlink,
      });
    } catch (error) {
      next(error);
    }
  }
}
