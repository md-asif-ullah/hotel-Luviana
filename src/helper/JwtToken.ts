import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface createJwtPropsType {
  name: string;
  data: any;
  secret: string;
  expiresTime: string;
  maxAge: number;
}

const JwtToken = ({
  name,
  data,
  secret,
  expiresTime,
  maxAge,
}: createJwtPropsType) => {
  const token = jwt.sign(data, secret, {
    expiresIn: expiresTime,
  });
  cookies().set({
    name: name,
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: maxAge,
  });
};
export default JwtToken;
