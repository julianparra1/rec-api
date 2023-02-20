const {GraphQLObjectType, GraphQLString} = require("graphql");

const UserType = new GraphQLObjectType({
		name: "User",
		fields: () => ({
			name: {
				description: "User Name",
				type: GraphQLString,
				//resolve: (parent, args, ctx) => (parent.name)
			},
			email: {
				description: "User Email",
				type: GraphQLString,
			},
			password: {
				description: "User Password",
				type: GraphQLString,
			}
		})
	})

module.exports = UserType