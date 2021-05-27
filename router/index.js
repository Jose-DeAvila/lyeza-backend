const express = require('express');
const Router = express.Router();

const medicineRouter = require('./medicineRouter/index');
const apiUserRouter = require('./userRouter/index');

Router.use('/users', apiUserRouter);
Router.use('/medicine', medicineRouter);

module.exports = Router;
