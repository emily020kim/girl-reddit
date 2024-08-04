const express = require('express');
const adminRouter = express.Router();

const {
  getAllAdmin,
} = require('../db/admin');


adminRouter.get('/admin', async( req, res, next) => {
  try {
    const admin = await getAllAdmin();

    res.send({
      admin
    });
  } catch (error) {
    console.log("Error getting all admin!", error);
    next(error)
  }
});

module.exports = adminRouter;
