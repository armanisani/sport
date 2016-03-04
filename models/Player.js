var mongoose = require('mongoose')


var playerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
})


var Player = mongoose.model("Player",playerSchema)

module.exports = Player
