const mongoose = require('mongoose');

const { Schema } = mongoose;

const mealSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  menu: {
    type: Schema.Types.ObjectId,
    ref: 'Menu',
    required: true
  }
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;