const {GraphQLObjectType, GraphQLString, GraphQLInt} = require("graphql");
const TeacherType = require("./TeacherType");

const SubjectType = new GraphQLObjectType({
		name: "Subject",
		fields: () => ({
			Maestro: {
				description: "Maestro",
				type: TeacherType,
				//resolve: (parent, args, ctx) => (parent.name)
			},
			Name: { 
				description: "Nombre de la Materia",
				type: GraphQLString,
			},
			Semestre: {
				description: "6",
				type: GraphQLInt,
			}
		})
	})

module.exports = SubjectType 