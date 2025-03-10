const Category = require('../models/categoryModel');

exports.getCategories = async (req, res) => {
    try {

        const categories = await Category.find({ type: "Продукти" });
    
        res.json(categories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).send('Server error');
      }
    }


exports.getServiceCategories = async (req, res) => {
  try {

    const categories = await Category.find({ type: "Услуги" });

    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).send('Server error');
  }
}