const mongoose = require('mongoose');

// créé un chema de donnée pour chaque Thing
const thingSchema = mongoose.Schema({
    name: { type:String, required: true },
    manufacturer: { type:String, required: true },
    description: { type:String, required: true },
    mainPepper: { type:String, required: true },
    heat: { type:Number, required: true },
    userId: { type:String, required: true },
    imageUrl: {type:String, required: true}
});

// expport model correspondant
module.exports = mongoose.model('Thing', thingSchema);