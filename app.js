const express = require('express');
const morgan = require('morgan');
const port = 8080;

const app = express();
const cors = require('cors');

app.use(morgan('common')); // let's see what 'common' format looks like
app.use(cors());

const appdata = require('./playstore.js');

const capitalize = (str) => { return str[0].toUpperCase() + str.substring(1).toLowerCase(); }
//routes
app.get('/apps', (req, res) => {
    //res.status(200).send('good to go');
    const { genres, sort } = req.query;

    if(sort) {
        if(
            capitalize(sort).length > 0 &&
            !['Rating', "App"].includes(capitalize(sort))){
            
            return res
            .status(400)
            .send('give rating or app');
        }
    }

    if(sort) {
        let capSort = capitalize(sort)
        appdata.sort((obj1,obj2) => {
            return obj1[capSort] > obj2[capSort] ? 1 : obj1[capSort] < obj2[capSort] ? - 1 : 0;
        })
    }

    const validGenre = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

    if(genres){
        if(validGenre.includes(capitalize(genres))){
            return res.json( appdata
                .filter(appItem => appItem["Genres"].toLowerCase().includes(genres.toLowerCase())));     
        }else{
            return res.status(400).send('not valid genre')
        }
    }
    

    res.json(appdata);
});

module.exports = app;