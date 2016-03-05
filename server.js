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

//////////////////////TEAMS ROUTES///////////////////////////////////

app.get('/teams/', function(req,res){
  Team.find({}, function(err, team){
    if(err) return console.log(err)
    res.json(team)
  })
})

app.get('/teams/:id', function(req,res){
  Team.findOne({_id:req.params.id}).populate('players').exec(function(err,team){
    if (err) throw err
    res.json(team)
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

//////////////////////PLAYERS ROUTES///////////////////////////////////
app.get('/players/', function(req,res){
  Player.find({}, function(err, player){
    if(err) return console.log(err)
    res.json(player)
  })
})

app.get('/players/:id', function(req,res){
  Player.findOne({_id:req.params.id}).populate('_team').exec(function(err,player){
    if (err) throw err
    res.json(player)
  })
})

app.delete('/players/:id', function(req,res){
  Player.findOneAndRemove({_id:req.params.id}, function(err){
    if (err) throw err
    res.json({success:true, message: 'player deleted'})
  })
})

app.post('/teams/:id/players', function(req,res){
  Team.findOne({_id:req.params.id}, function(err,team){
    if (err) throw err
    var newPlayer = new Player(req.body)
    newPlayer._team = team._id
    newPlayer.save(function(err){
      if (err) throw err
      team.players.push(newPlayer)
      team.save(function(err,t){
        if (err) throw err
        res.json({success:true, message:'team with players', team:t})
      })
    })
  })
})

app.patch('/players/:id', function(req,res){
  Team.findOneAndUpdate({_id:req.params.id}, req.body, {new:true}, function(err,player){
    if (err) throw err
    res.json({success:true, message:'player updated', player: player})
  })
})

app.listen(3000, function(err){
  if(err) return console.log(err)
  console.log("Listening to port 3000");
})
