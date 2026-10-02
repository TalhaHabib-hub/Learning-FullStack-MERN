const express = require('express')
const userRouter = express.Router();
const {addedHomes} = require('./hostRouter')


userRouter.get("/", (req, res, next) => {
  console.log(addedHomes);
  console.log(addedHomes.at(-1));
  res.render('user',{pageTitle: 'Home',addedHomes: addedHomes});
});

// exports.userRouter = userRouter;
// module.exports = {userRouter}
module.exports = userRouter;