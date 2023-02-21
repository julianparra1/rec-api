const query = require("./RootQuery");
const mutation = require("./Mutations")
const { GraphQLSchema } = require("graphql");

module.exports = new GraphQLSchema({
    query: query,
    mutation: mutation
  });