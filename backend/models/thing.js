const mongoose = require('mongoose');

// créé un chema de donnée pour chaque Thing
const thingSchema = mongoose.Schema({
    title: { type:String, required: true },
    description: { type:String, required: true },
    imageUrl: { type:String, required: true },
    userId: { type:String, required: true },
    price: { type:Number, required: true }
});

// expport model correspondant
module.exports = mongoose.model('Thing', thingSchema);