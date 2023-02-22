const {GraphQLObjectType, GraphQLString} = require("graphql");

const UserType = require("./UserType");

const TeacherType = new GraphQLObjectType({
		name: "Teacher",
		fields: () => ({
			User: {
				description: "User Name",
				type: UserType,
				//resolve: (parent, args, ctx) => (parent.name)
			},
			firstName: { 
				description: "User Email",
				type: GraphQLString,
			},
			lastName: {
				description: "User Password",
				type: GraphQLString,
			}
		})
	})

module.exports = TeacherType 