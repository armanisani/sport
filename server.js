var
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  express = require('express'),
  logger = require('morgan'),
  app = express(),
  Player = require('./models/Player.js'),
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

app.get('/teams/:id', function(req,res){
  Team.findOne({_id:req.params.id}, function(err,team){
    if (err) throw err
    res.json({success:true, message: 'team found', team: team})
  })
})

app.delete('/teams/:id', function(req,res){
  Team.findOneAndRemove({_id:req.params.id}, function(err){
    if (err) throw err
    res.json({success:true, message: 'team deleted'})
  })
})

app.post('/teams/', function(req,res){
  Team.create(req.body, function(err,team){
    if(err) return console.log(err)
    res.json(team)
  })
})

app.patch('/teams/:id', function(req,res){
  Team.findOneAndUpdate({_id:req.params.id}, req.body, {new:true}, function(err,team){
    if (err) throw err
    res.json({success:true, message:'team updated', team: team})
  })
})

app.listen(3000, function(err){
  if(err) return console.log(err)
  console.log("Listening to port 3000");
})
