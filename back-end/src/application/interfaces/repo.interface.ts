import { User } from "../../domain/entities/user.entity";

export interface IUserRepository {
  createUserRepo(user: User): Promise<User>;
  loginUserRepo(data: { email: string; password: string }): Promise<User>;
  getUserRepo(userId: string): Promise<User>;
  checkUserWithEmailRepo(email: string): Promise<User>;
}
