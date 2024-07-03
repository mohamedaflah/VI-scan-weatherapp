export class User {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
    private readonly verificationStatus: boolean
  ) {}
}
