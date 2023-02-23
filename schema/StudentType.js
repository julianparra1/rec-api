const {GraphQLObjectType, GraphQLString} = require("graphql");

const StudentType = new GraphQLObjectType({
		name: "Student",
		fields: () => ({
			firstName: { 
				description: "User Email",
				type: GraphQLString,
			},
			lastName: {
				description: "User Password",
				type: GraphQLString,
			},
			curp: {
				description: "Student CURP",
				type: GraphQLString
			}
		})
	})

module.exports = StudentType 