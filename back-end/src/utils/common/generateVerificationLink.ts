import jwt from "jsonwebtoken";
export const generateVerficationLink = (
  payload: string,
  queryPerfix: string
) => {
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "20d",
  });
  return `${process.env.CLIENT_ORIGIN}?${queryPerfix}=${jwtToken}`;
};
