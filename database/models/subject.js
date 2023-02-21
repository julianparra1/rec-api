'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subject.belongsTo(models.Teacher, { foreignKey: 'maestroId', as: 'maestro'} )
    }
  }
  Subject.init({
    maestroId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    semestre: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};