var
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  express = require('express'),
  logger = require('morgan'),
  app = express(),
  Player = require('./models/Player.js'),
  Team = require('./models/Team.js'),
  teamRouter = require('./routes/teams.js'),
  playerRouter = require('./routes/players.js')

// mongoose connection
mongoose.connect('mongodb://localhost/als-sports', function(err){
  if(err) return console.log(err)
  console.log("mongoose connected to db")
})
// middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//////////////////////TEAMS ROUTES///////////////////////////////////
app.use('/teams', teamRouter)
//////////////////////PLAYERS ROUTES///////////////////////////////////
app.use('/players', playerRouter)


app.listen(3000, function(err){
  if(err) return console.log(err)
  console.log("Listening to port 3000");
})
