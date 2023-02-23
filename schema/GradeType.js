const {GraphQLObjectType, GraphQLString, GraphQLInt} = require("graphql");
const StudentType = require("./StudentType");
const SubjectType = require("./SubjectType");

const GradeType = new GraphQLObjectType({
		name: "Grades",
		fields: () => ({
			Student: {
				description: "Student",
				type: StudentType,
			},
			Materia: { 
				description: "Materia",
				type: SubjectType,
			},
			Semestre: {
				description: "User Password",
				type: GraphQLInt,
			},
			firstParcial: {
				description: "",
				type: GraphQLInt
			},
			secondParcial: {
				description: "",
				type: GraphQLInt
			},
			thirdParcial: {
				description: "",
				type: GraphQLInt
			}
		})
	})

module.exports = GradeType 