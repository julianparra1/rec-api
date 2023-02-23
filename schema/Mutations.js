const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLError, GraphQLInt } = require("graphql");
const LoginResponse = require("./ResponseType");
const { User, Teacher, Student, Subject, Grade } = require("../database/models")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const VerifyToken = require('../auth/auth');

const UserType = require("./UserType");
const TeacherType = require("./TeacherType");
const StudentType = require("./StudentType");
const GradeType = require("./GradeType");
const SubjectType = require("./SubjectType");

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
				const user = await VerifyToken(ctx.token);
				
				if(user){
					const newTeacher = await Teacher.create({ userId: user.id, firstName, lastName })
					return { User: {...user.toJSON()}, firstName: newTeacher.firstName, lastName: newTeacher.lastName}
				};

				return new GraphQLError('Token verification failed', {
					extensions: { code: 'REJECTED!!!', }
					
				});
			},
		},
		registerStudent: {
			type: StudentType,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				lastName: { type: new GraphQLNonNull(GraphQLString) },
				curp: { type: new GraphQLNonNull(GraphQLString) },
			},
			async resolve (parent, args, ctx) {
				const { firstName, lastName, curp } = args;
				const curpExists = await Student.findOne({ where: { curp } });

				if (curpExists) {
					return new GraphQLError('CURP Already exists!', {
						extensions: { code: 'REJECTED!!!', },
					  }); 
				};

				return await Student.create({ firstName, lastName, curp });
			},
		},
		subscribeToSubject: {
			type: SubjectType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				semestre: { type: new GraphQLNonNull(GraphQLInt) },
			},
			async resolve (parent, args, ctx) {
				const { name, semestre } = args;

				const user = await VerifyToken(ctx.token);
				if(!user){
					return new GraphQLError('Token verification failed', {
						extensions: { code: 'REJECTED!!!', },
					}); 
				}

				const teacher = await Teacher.findByPk(user.id)
				if (!teacher) {
					return new GraphQLError('No teacher for this user!', {
						extensions: { code: 'REJECTED!!!', },
					}); 
				};
					
				const newSubject = await Subject.create({ maestroId: user.id, name: name, semestre: semestre })
				return { Maestro: {...teacher.toJSON()}, Name: newSubject.name, Semestre: newSubject.semestre}

			},
		},
		gradeStudent: {
			type: GradeType,
			args: {
				curp: { type: new GraphQLNonNull(GraphQLString) },
				subjectId: { type: new GraphQLNonNull(GraphQLInt) },
				semestre: { type: new GraphQLNonNull(GraphQLInt) },
				firstParcial: { type: GraphQLInt },
				secondParcial: { type: GraphQLInt },
				thirdParcial: { type: GraphQLInt },
			},
			async resolve (parent, args, ctx) {
				const { curp, subjectId ,semestre, firstParcial, secondParcial, thirdParcial} = args;
				
				const user = await VerifyToken(ctx.token);
				if(!user){
					return new GraphQLError('Token verification failed', {
						extensions: { code: 'REJECTED!!!', },
					}); 
				}

				const teacher = await Teacher.findByPk(user.id)
				if (!teacher) {
					return new GraphQLError('No teacher for this user!', {
						extensions: { code: 'REJECTED!!!', },
					}); 
				};

				const student = await Student.findOne({ where: { curp } });
				if(!student){
					return new GraphQLError('Student does not exist!', {
						extensions: { code: 'REJECTED!!!', },
					}); 
				}
				
				const subject = await Student.findOne({ where: { id: subjectId } });
				if(!subject){
					return new GraphQLError('Subject does not exist!', {
						extensions: { code: 'REJECTED!!!', },
					}); 
				}

				const newGrade = await Grade.create({ studentId: student.id, materiaId: subjectId, semestre: semestre, firstParcial, secondParcial, thirdParcial})
				return { Student: {...student.toJSON()}, Materia: {...subject.toJSON()}, Semestre: newGrade.semestre, firstParcial, secondParcial, thirdParcial}
			},
		},
	}
});

module.exports = Mutation
