'use strict';

require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');


const express = require('express');
const morgan = require('morgan');
const app = express();
const MOVIES = require('./movies.json');
app.use(cors());
app.use(helmet());


app.use(function validateBearerToken(req, res, next) {
  const authToken = req.get('Authorization');
  const apiToken = process.env.API_TOKEN;
  // move to the next middleware
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
});


app.use(morgan('common'));


app.get('/movie', (req, res) => {
  //1. get values from the request
  
  const country = req.query.country;
  const genre = req.query.genre;
  const avg_vote = req.query.avg_vote;

  let filtered_movies = MOVIES;
    
  //2. validate the values
  
  if(genre !== undefined){
    if(genre.length <=0){
      return res.status(400).send('must enter some non blank string to look for genre');
    }
    filtered_movies = filtered_movies.filter(movie => {
      return movie.genre.toUpperCase().includes(genre.toUpperCase()); 
    });
  }
  
  if(country !== undefined){
    if(country.length <=0){
      return res.status(400).send('must enter some non blank string to look for country');
    }
    filtered_movies = filtered_movies.filter(movie => {
      return movie.country.toUpperCase().includes(country.toUpperCase()); 
    });
  }
  
  if(avg_vote !== undefined){
    if(isNaN(avg_vote)){
      return res.status(400).send('must enter avg vote number to search for');
    }
    filtered_movies = filtered_movies.filter(movie => {
      return movie.avg_vote >= avg_vote; 
    });
  }
  
  res
    .json(filtered_movies);
    
});

module.exports = app;