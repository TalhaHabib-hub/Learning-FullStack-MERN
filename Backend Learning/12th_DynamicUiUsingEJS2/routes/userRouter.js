const express = require('express')
const userRouter = express.Router();
const {addedHomes} = require('./hostRouter')


userRouter.get("/", (req, res, next) => {
  console.log(addedHomes);
  console.log(addedHomes.at(-1));// render not sendfile for the use of the templating engine
  res.render('user', { pageTitle: 'Home', addedHomes: addedHomes }); //Talha earlier it  was this :
  //res.sendFile(path.join(useDir,'views','user.html'))
});

// exports.userRouter = userRouter;
// module.exports = {userRouter}
module.exports = userRouter;