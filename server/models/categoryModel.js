const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    main: {type: String, required: true},
    image: {type: String, required: true},
    subcategories: [String],
    type: {type: String, required: true},
  });



module.exports = mongoose.model('Category', categorySchema, "categories");
