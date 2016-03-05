var express = require('express')
var teamRoutes = express.Router()
var Team = require('../models/Team.js')
var Player = require('../models/Player.js')

teamRoutes.get('/', function(req,res){
  Team.find({}, function(err, team){
    if(err) return console.log(err)
    res.json(team)
  })
})
 // create players
teamRoutes.post('/:id/players', function(req,res){
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

teamRoutes.get('/:id', function(req,res){
  Team.findOne({_id:req.params.id}).populate('players').exec(function(err,team){
    if (err) throw err
    res.json(team)
  })
})

teamRoutes.delete('/:id', function(req,res){
  Team.findOneAndRemove({_id:req.params.id}, function(err){
    if (err) throw err
    res.json({success:true, message: 'team deleted'})
  })
})

teamRoutes.post('/', function(req,res){
  Team.create(req.body, function(err,team){
    if(err) return console.log(err)
    res.json(team)
  })
})

teamRoutes.patch('/:id', function(req,res){
  Team.findOneAndUpdate({_id:req.params.id}, req.body, {new:true}, function(err,team){
    if (err) throw err
    res.json({success:true, message:'team updated', team: team})
  })
})

module.exports = teamRoutes
