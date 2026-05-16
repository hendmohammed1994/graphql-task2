import Comment from "../../models/Comment.js";

const commentQuery = {
  comments: async (_, arg, context) => {
    return await Comment.find();
  },
};
export default commentQuery;
