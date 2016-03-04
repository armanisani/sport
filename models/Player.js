var mongoose = require('mongoose')


var playerSchema = Schema({
  name: String,
  age: Number,
  teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
})


var Player = mongoose.model("Team",playerSchema)

module.exports = Player
