import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connectToDatabase } from "./db.connection.js";
import { checkAuth } from "./auth.js";
import typeDefs from "./schema.js";
import resolvers from "./resolvers/index.js";

await connectToDatabase();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    return {
      message: err.message,
    };
  },
});

const PORT = process.env.PORT;
const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req }) => {
    const user = await checkAuth(req);
    return { user };
  },
});

console.log(`Server running on ${url}`);
