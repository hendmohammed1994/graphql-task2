import { GraphQLError } from "graphql";
import Post from "../../models/Post.js";

const postMutation = {
  async addPost(_, { post }, context) {
    if (!context.user?.userId) {
      throw new GraphQLError("you have not access , please login first", {
        extensions: {
          http: { status: 401 },
        },
      });
    }
    const newPostData = {
      ...post,
      author: context.user.userId,
    };
    return await Post.create(newPostData);
  },

  async deletePost(_, { id }, context) {
    if (!context.user?.userId) {
      throw new GraphQLError("you have not access , please login first", {
        extensions: {
          http: { status: 401 },
        },
      });
    }
    await Post.findByIdAndDelete(id);
    return "deleted successfully";
  },

  async updatePost(_, { id, post }, context) {
    if (!context.user?.userId) {
      throw new GraphQLError("you have not access , please login first", {
        extensions: {
          http: { status: 401 },
        },
      });
    }
    return await Post.findByIdAndUpdate(id, post, { new: true });
  },
};

export default postMutation;
