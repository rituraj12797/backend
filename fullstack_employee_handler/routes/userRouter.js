const express = require('express')
const userRouter = express.Router();

const createUser = require('../controllers/createUser')
const getUser = require('../controllers/getUser')

userRouter.post('/createUser',createUser);
userRouter.get('/getuser',getUser);

module.exports = userRouter;