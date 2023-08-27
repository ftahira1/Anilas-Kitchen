const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;