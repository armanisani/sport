var
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  express = require('express'),
  logger = require('morgan'),
  app = express()
  Team = require('./models/Team.js')
// mongoose connection
mongoose.connect('mongodb://localhost/als-sports', function(err){
  if(err) return console.log(err)
  console.log("mongoose connected to db")
})
// middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

////////////////// Routes ////////////////////////

app.get('/teams/', function(req,res){
  Team.find({}, function(err, team){
    if(err) return console.log(err)
    res.json(team)
  })
})
app.create('/teams/', function(req,res){
  Team.create
})
