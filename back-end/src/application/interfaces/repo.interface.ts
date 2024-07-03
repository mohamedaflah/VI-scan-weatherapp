import { User } from "../../domain/entities/user.entity";

export interface UserRepository {
  createUserRepo(user: User): Promise<User>;
  loginUserRepo(data: { email: string; password: string }): Promise<User>;
  getUserRepo(userId: string): Promise<User>;
}
