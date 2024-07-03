import { User } from "../../domain/entities/user.entity";

export interface UserUseCase {
  createUserUsecase(user: User): Promise<User>;
  loginUserUsecase(data: { email: string; password: string }): Promise<User>;
  getUserUsecase(userId: string): Promise<User>;
}
