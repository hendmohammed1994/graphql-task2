const typeDefs = ` #gql

 type Query {
    users: [User]!
    posts: [Post]!
    user(id:ID!): User
    post(id: ID!): Post
    comments: [Comment]!
   
  }
  type User {
    _id: ID!
    name: String
    email: String!
    posts: [Post]
    comments: [Comment]
  }

  type Post {
    _id: ID!
    title: String!
    content: String
    author: User
    comments: [Comment]
    createdAt: String
    updatedAt: String
  }

  type Comment {
    _id: ID!
    content: String!
    user: User
    post: Post
    createdAt: String
    updatedAt: String
  }


  type Mutation {
    register(user:UserInput): User
    login(user:UserInput):AuthPayload
    
    addPost(post: PostInput): Post
    updatePost(id:ID!, post:PostInput): Post
    deletePost(id:ID!): String
    
    addComment(comment: CommentInput): Comment

  }

  type AuthPayload {
  token: String!
  user: User!
}

  input UserInput{
    name:String
    email:String!
    password:String!
  }

  input PostInput{
    title:String!
    content: String

  }
  input CommentInput{
    content:String!
    post: ID!
  }
`;

export default typeDefs;
