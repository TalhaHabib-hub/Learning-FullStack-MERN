const express = require('express');
const app = express();
const { AdminRouter, addedBooks } = require('./routes/admin');
const userRouter = require('./routes/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', AdminRouter);
app.use('/user', userRouter);
app.get('/', (req, res, next) => {
  res.render('home', { pageTitle: 'Library Management System', addedBooks: addedBooks });
});

app.use((req, res, next) => {
  res.status(404).render('404',{pageTitle:'page not found'})
  
})

const PORT = 4444;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
} );