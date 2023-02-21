const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLError } = require("graphql");
const LoginResponse = require("./ResponseType");
const UserType = require("./UserType");
const { User } = require("../database/models")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const VerifyToken = require('../auth/auth');
const TeacherType = require("./TeacherType");

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		registerUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
			},
			async resolve (parent, args) {
				const { name, email, password } = args;
				const emailExists = await User.findOne({ where: { email} });
				if (emailExists) {
					return new GraphQLError('Email Already exists!', {
						extensions: { code: 'REJECTED!!!', },
					  }); 
				};
				return await User.create({ name, email, password });
			},
		},
		loginUser: {
			type: LoginResponse,
			args: {
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
			},
			async resolve(parent, args) {
				const { email, password } = args;
				const user = await User.findOne({ where: { email } });

				if (user && bcrypt.compareSync(password, user.password)) {
					const token = jwt.sign({ id: user.id }, 'AWOGUS');
					return { ...user.toJSON(), token };
				};
				
				return new GraphQLError('Email or password is incorrect.', {
					extensions: { code: 'REJECTED!!!', }
				}); 
			},
		},
		registerTeacher: {
			type: TeacherType,
			args: {
				email: { type: new GraphQLNonNull(GraphQLString) },
			},
			async resolve(parent, args, ctx) {
				const { email } = args;
				const user = await User.findOne({ where: { email } });

				if(await VerifyToken(ctx.token)){
					return user
				};
				return new GraphQLError('Token verification failed', {
					extensions: { code: 'REJECTED!!!', }
				});
			},
		}
	}
});

module.exports = Mutation
