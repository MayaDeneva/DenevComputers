
const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); 
    res.json(products); 
  } catch (err) {
    console.error("Error fetching products in controler:", err); 
    res.status(500).json({ message: "Can't fetch products error" });
  }
};

exports.getTopProducts = async (req, res) => {
  try {
    const products = await Product.find()
    .sort({order_count: -1})
    .limit(8); 
    res.json(products); 
  } catch (err) {
    console.error("Error fetching products in controler:", err); 
    res.status(500).json({ message: "Can't fetch products error" });
  }
};


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category"); // Get all unique categories
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Error fetching categories" });
  }
};


const applyPriceFilter = (filter, minPrice, maxPrice) => {
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = parseFloat(minPrice);
    }
    if (maxPrice) {
      filter.price.$lte = parseFloat(maxPrice);
    }
  }
  return filter;
};


// controllers/productController.js
exports.getProductsByCategory = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      sortBy,
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      filters,
    } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category query parameter is required" });
    }

    // Basic filter for category, etc.
    let baseFilter = { 
      category: { $regex: category, $options: "i" }, 
      instock: { $gt: 0 } 
    };

    // Subcategory if any
    if (subcategory) {
      baseFilter.category = { $regex: subcategory, $options: "i" };
    }

    // Price filter logic remains untouched
    baseFilter = applyPriceFilter(baseFilter, minPrice, maxPrice);

    // parse attribute filters
    let parsedFilters = {};
    if (filters) {
      try {
        parsedFilters = JSON.parse(filters); 
        // e.g. { "ГАРАНЦИЯ": ["1 МЕСЕЦ","6 МЕСЕЦА"], "CPU (Процесор)": ["736"] }
      } catch (err) {
        console.error("Error parsing attribute filters:", err);
      }
    }

    // Build an array of conditions
    const andConditions = [];
    // push the baseFilter as an object
    andConditions.push(baseFilter);

    // For each attribute e.g. key "ГАРАНЦИЯ" => values ["1 МЕСЕЦ","6 МЕСЕЦА"]
    Object.keys(parsedFilters).forEach((attribute) => {
      const values = parsedFilters[attribute];
      if (Array.isArray(values) && values.length > 0) {
        // each attribute condition
        andConditions.push({
          attributes: {
            $elemMatch: {
              name: attribute,
              value: { $in: values },
            },
          },
        });
      }
    });

    // final query
    let finalFilter = { $and: andConditions };

    // sort logic
    let sort = {};
    if (sortBy === "price_asc") sort = { price: 1 };
    else if (sortBy === "price_desc") sort = { price: -1 };
    else if (sortBy === "name_asc") sort = { name: 1 };
    else if (sortBy === "name_desc") sort = { name: -1 };

    const skip = (page - 1) * limit;
    const totalCount = await Product.countDocuments(finalFilter);
    const products = await Product.find(finalFilter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit, 10));

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.json({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products" });
  }
};





exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Error fetching product" });
  }
};



// Endpoint to fetch price range
exports.getPriceRangeByCategory = async (req, res) => {
  try {
    const { category, subcategory } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    let filter = { category: { $regex: category, $options: "i" } };
    if (subcategory) {
      filter.category = { $regex: subcategory, $options: "i" };
    }

    const minPrice = await Product.find(filter).sort({ price: 1 }).limit(1).select("price");
    const maxPrice = await Product.find(filter).sort({ price: -1 }).limit(1).select("price");

    if (!minPrice.length || !maxPrice.length) {
      return res.json({ minPrice: 0, maxPrice: 1000 });
    }

    res.json({
      minPrice: minPrice[0].price,
      maxPrice: maxPrice[0].price,
    });
  } catch (error) {
    console.error("Error fetching price range:", error);
    res.status(500).json({ message: "Error fetching price range" });
  }
};




// Endpoint to fetch unique attributes dynamically
exports.getProductAttributes = async (req, res) => {
  try {
    const { category, subcategory } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    let filter = { category: { $regex: category, $options: "i" } };
    if (subcategory) {
      filter.category = { $regex: subcategory, $options: "i" };
    }

    // Aggregate query to dynamically get unique attribute names and values
    const attributes = await Product.aggregate([
      { $match: filter }, // Filter by category and subcategory
      { $unwind: "$attributes" }, // Flatten the attributes array
      { $group: { _id: "$attributes.name", values: { $addToSet: "$attributes.value" } } }, // Group by attribute name and collect unique values
      { $project: { _id: 0, name: "$_id", values: 1 } } // Project the result to return the name and values
    ]);

    if (attributes.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    // Convert the result to an object where key is the attribute name and value is the array of unique values
    const attributeMap = {};
    attributes.forEach(attribute => {
      attributeMap[attribute.name] = attribute.values;
    });

    res.json(attributeMap);

  } catch (error) {
    console.error("Error fetching product attributes:", error);
    res.status(500).json({ message: "Error fetching product attributes" });
  }
};


exports.searchProducts = async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required." });
  }

  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const skip = (pageNum - 1) * limitNum;

  try {
    // Filter: find products whose title matches (case-insensitive)
    const filter = {
      title: { $regex: query, $options: "i" },
      instock: { $gt: 0 } 
    };

    // 1) Count total matching docs
    const total = await Product.countDocuments(filter);

    // 2) Fetch limited docs
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limitNum);

    // 3) Calculate total pages
    const totalPages = Math.ceil(total / limitNum);

    return res.json({
      results: products,
      page: pageNum,
      limit: limitNum,
      totalPages,
      totalResults: total,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Server error during search." });
  }
};




