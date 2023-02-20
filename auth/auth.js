const { User } = require('../database/models')
const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
    try {
			if (!token) return null;
      const { id } = await jwt.verify(token, 'AWOGUS');

			console.log(id)
			
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
			console.log(error)
      return false;
    }
  };

module.exports = verifyToken