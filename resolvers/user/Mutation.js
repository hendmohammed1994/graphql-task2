import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import User from "../../models/User.js";

const useMutation = {
  async register(parent, arg) {
    return await User.create(arg.user);
  },

  async login(_, { user }) {
    const { email, password } = user;

    if (!email || !password) {
      throw new GraphQLError("Email and password are required");
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw new GraphQLError("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) {
      throw new GraphQLError("Invalid email or password");
    }

    const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return {
      token,
      user: foundUser,
    };
  },
};

export default useMutation;
