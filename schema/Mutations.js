const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLError } = require("graphql");
const LoginResponse = require("./ResponseType");
const UserType = require("./UserType");
const { User, Teacher } = require("../database/models")
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
		registerNewTeacher: {
			type: TeacherType,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				lastName: { type: new GraphQLNonNull(GraphQLString) }
			},
			async resolve(parent, args, ctx) {
				const { firstName, lastName } = args;
				console.log(ctx.token)
				const user = await VerifyToken(ctx.token);
				
				if(user){
					const { id } = await jwt.verify(ctx.token, 'AWOGUS');
					const newTeacher = await Teacher.create({ userId: id, firstName: firstName, lastName: lastName })
					
					return { User: {...user.toJSON()}, firstName: newTeacher.firstName, lastName: newTeacher.lastName}
				};

				return new GraphQLError('Token verification failed', {
					extensions: { code: 'REJECTED!!!', }
					
				});
			},
		}
	}
});

module.exports = Mutation
