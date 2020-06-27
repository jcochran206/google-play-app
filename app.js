const express = require('express');
const morgan = require('morgan');
const port = 8080;

const app = express();
const cors = require('cors');

app.use(morgan('common')); // let's see what 'common' format looks like
app.use(cors());

const books = require('./playstore.js');

//routes
app.get('/', (req, res) => {
    res.status(200).send('good to go');
})

app.listen(port, () => {
    console.log(`Server started on PORT ${port}`);
  });