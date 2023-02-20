const { GraphQLInt, GraphQLList, GraphQLObjectType } = require("graphql");
const UserType = require("./UserType.js");

const { User } = require("../database/models/index.js")

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    User: {
      args:{
        id: {type: GraphQLInt},
      },
      description: 'Returns hello',
      type: UserType,
      resolve: (__, args, ctx) => User.findByPk(args.id)
    },
  }),
});

module.exports = RootQuery