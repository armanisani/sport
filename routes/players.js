var express = require('express')
var playerRoutes = express.Router()
var Player = require('../models/Player.js')

playerRoutes.get('/', function(req,res){
  Player.find({}, function(err, player){
    if(err) return console.log(err)
    res.json(player)
  })
})

playerRoutes.get('/:id', function(req,res){
  Player.findOne({_id:req.params.id}).populate('_team').exec(function(err,player){
    if (err) throw err
    res.json(player)
  })
})

playerRoutes.delete('/:id', function(req,res){
  Player.findOneAndRemove({_id:req.params.id}, function(err){
    if (err) throw err
    res.json({success:true, message: 'player deleted'})
  })
})



playerRoutes.patch('/:id', function(req,res){
  Team.findOneAndUpdate({_id:req.params.id}, req.body, {new:true}, function(err,player){
    if (err) throw err
    res.json({success:true, message:'player updated', player: player})
  })
})

module.exports = playerRoutes
