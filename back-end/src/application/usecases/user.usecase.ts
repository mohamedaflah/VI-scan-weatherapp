import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../interfaces/repo.interface";
import { IUserUseCase } from "../interfaces/usecase.interface";

// user usecase or interactor
export class UserUseCase implements IUserUseCase {
  private repository: IUserRepository;
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }
  async createUserUsecase(body: User): Promise<User> {
    const user = await this.repository.createUserRepo(body);
    return user;
  }
  async loginUserUsecase(data: {
    email: string;
    password: string;
  }): Promise<User> {
    return await this.repository.loginUserRepo(data);
  }
  async getUserUsecase(userId: string): Promise<User> {
    return await this.repository.getUserRepo(userId);
  }
  async checkUserWithEmail(email: string): Promise<User|null> {
    return await this.repository.checkUserWithEmailRepo(email);
  }
}
