const query = require("./RootQuery");
const mutation = require("./MutationType")
const { GraphQLSchema } = require("graphql");

module.exports = new GraphQLSchema({
    query: query,
    mutation: mutation
  });