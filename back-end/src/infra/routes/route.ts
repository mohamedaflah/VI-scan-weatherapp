import { Router } from "express";
import { UserRegisterController } from "../../presentation/controllers/User/userregister.controller";
import { UserRepository } from "../../respositories/user.repository";
import { UserUseCase } from "../../application/usecases/user.usecase";
import { LoginUserController } from "../../presentation/controllers/User/loginuser.controller";
import { VerifyUserController } from "../../presentation/controllers/User/verifyuser.controller";
const router = Router();

const repo = new UserRepository();
const useCase = new UserUseCase(repo);

const register = new UserRegisterController(useCase);
const login = new LoginUserController(useCase);
const verify = new VerifyUserController(useCase);

router.post(`/register`, register.registerUser.bind(register));
router.post(`/login`, login.loginUser.bind(login));
router.post(`/verify`, verify.verifyUser.bind(verify));

export default router;
