const { GraphQLString, GraphQLObjectType } = require("graphql");
const UserType = require("./UserType.js");

const { Student } = require("../database/models");

const StudentType = require("./StudentType.js");

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    getStudent: {
      description: 'Returns student by CURP',
      type: StudentType,
      args:{
        curp: {type: GraphQLString },
      },
      async resolve (__, args, ctx) { 
        const { curp } = args
        return await Student.findOne({ where: { curp } }) 
      }
    },

  }),
});

module.exports = RootQuery