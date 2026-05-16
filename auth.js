import { GraphQLError } from "graphql";
import { promisify } from "util";
import jwt from "jsonwebtoken";

export async function checkAuth(req) {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    return decode;
  } catch (err) {
    console.error("Auth error", err.message);
    return null;
  }
}
