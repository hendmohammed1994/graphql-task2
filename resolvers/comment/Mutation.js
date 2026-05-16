import { GraphQLError } from "graphql";
import Comment from "../../models/Comment.js";

const commentMutation = {
  async addComment(_, { comment }, context) {
    if (!context.user.id) {
      throw new GraphQLError("you have not access , please login first", {
        extensions: {
          http: { status: 401 },
        },
      });
    }
    const newCommentData = {
      ...comment,
      user: context.user.userId,
    };
    return await Comment.create(newCommentData);
  },
};

export default commentMutation;
