const {GraphQLObjectType, GraphQLString, GraphQLInt} = require("graphql");

const LoginResponse = new GraphQLObjectType({
		name: "LoginResponse",
		fields: () => ({
			id: {
				description: "User id when logged in",
				type: GraphQLInt,
			},
			token: {
				description: "Auth Token",
				type: GraphQLString,
			},
		}),
	});

module.exports = LoginResponse