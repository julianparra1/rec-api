'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Grade.belongsTo(models.Student, {foreignKey: 'studentId', as: 'student' })
      Grade.hasMany(models.Subject, {foreignKey: 'materiaId', as: 'materias' })
    }
  }
  Grade.init({
    studentId: DataTypes.INTEGER,
    materiaId: DataTypes.INTEGER,
    semestre: DataTypes.INTEGER,
    firstParcial: DataTypes.INTEGER,
    secondParcial: DataTypes.INTEGER,
    thirdParcial: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Grade',
  });
  return Grade;
};