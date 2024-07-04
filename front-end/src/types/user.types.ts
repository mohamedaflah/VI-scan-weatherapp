export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  verificationStatus: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  favouriteCities?: { cityname: string }[];
}

export interface UserReducerInitial {
  loading: boolean;
  err: string | boolean;
  user: User|null;
}
