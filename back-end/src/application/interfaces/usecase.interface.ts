import { User } from "../../domain/entities/user.entity";

export interface IUserUseCase {
  createUserUsecase(user: User): Promise<User>;
  loginUserUsecase(data: { email: string; password: string }): Promise<User>;
  getUserUsecase(userId: string): Promise<User>;
  checkUserWithEmail(email: string): Promise<User|null>;
}
