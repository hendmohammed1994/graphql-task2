import Post from "../../models/Post.js";

const postQuery = {
  posts: async (_, arg, context) => {
    return await Post.find();
  },
  async post(_, { _id }) {
    try {
      return await Post.findOne({ _id });
    } catch (error) {
      throw new Error("Can't get post");
    }
  },
};
export default postQuery;
