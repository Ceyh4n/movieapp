//create route for the movie page

const express = require('express')
const router = express.Router();
const MovieModel = require('../models/Movie')

//getting movies from db to movie page (/api/movies)
router.get('/', (req, res) => {
  MovieModel.find() // => lists all db items
  .then((data)=>{res.json(data)})
  .catch((err)=>{res.json(err)})
})

// getting movie by giving ID
router.get('/:movieId', (req, res, next) => {
  MovieModel.findById(req.params.movieId) // => lists movie by its ID
  .then((data)=>{
    //if(data===null){next({message:'Movie ID not found!', code:99})}; if returned object null then error message but latest updates runs catch directly
    res.json(data)})
  .catch((err)=>{
    next({message:'Movie ID not found!', code:99});
    res.json(err)})
})

//sending new movies to the db.
router.post('/', function (req, res) {
    const movie = new MovieModel(req.body); //matching all movie properties automatically
    // movie.save((err,data)=>{  //using callback function
    //     if(err){res.json(err)};
    //     res.json(data);
    // });

    const promise = movie.save(); // using promise
    promise.then((data)=>{
      res.json(data)
    }).catch((err)=>{
      res.json(err)
    })
})

module.exports = router;