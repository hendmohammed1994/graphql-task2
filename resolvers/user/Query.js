import User from "../../models/User.js";
const userQuery = {
  users: async () => {
    return await User.find();
  },
  async user(_, { _id }) {
    return await User.findOne({ _id });
  },
};
export default userQuery;
