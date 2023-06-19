const { BadRequestError } = require('../errors');

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    console.log('error');
    throw new BadRequestError('Test User. Read Only');
  }
  next();
};

module.exports = testUser;
