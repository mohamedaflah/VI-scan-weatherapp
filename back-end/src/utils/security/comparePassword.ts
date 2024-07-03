import bcrypt from "bcryptjs";
export const comparePassword = async (
  normalPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(normalPassword, hashedPassword);
};
