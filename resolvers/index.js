import userQuery from "./user/Query.js";
import userMutation from "./user/Mutation.js";
import postQuery from "./post/Query.js";
import postMutation from "./post/Mutation.js";
import commentQuery from "./comment/Query.js";
import commentMutation from "./comment/Mutation.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

const resolvers = {
  Query: {
    ...userQuery,
    ...postQuery,
    ...commentQuery,
  },
  Mutation: {
    ...userMutation,
    ...postMutation,
    ...commentMutation,
  },
  User: {
    posts: async (parent) => {
      return await Post.find({ author: parent._id });
    },
    comments: async (parent) => {
      return await Comment.find({ user: parent._id });
    },
  },
  Post: {
    author: async (parent) => {
      return await User.findOne({ _id: parent.author });
    },
    comments: async (parent) => {
      return await Comment.find({ post: parent._id });
    },
  },
  Comment: {
    user: async (parent) => {
      return await User.findOne({ _id: parent.user });
    },
    post: async (parent) => {
      return await Post.findOne({ _id: parent.post });
    },
  },
};

export default resolvers;
