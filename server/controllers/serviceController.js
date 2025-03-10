const Service = require("../models/serviceModel");

exports.getServiceByCategory = async (req, res) => {
    try {
      const { category } = req.query; // Extract the 'category' query parameter
      if (!category) {
        return res.status(400).json({ message: "Category query parameter is required" });
      }
  
      // Build the filter
      const filter = {
        category:  category 
      };
  
      // Fetch services
      const services = await Service.find(filter);
  
      // Handle no services found
      if (services.length === 0) {
        return res.status(404).json({ message: "No services found for this category" });
      }
  
      res.json(services); // Respond with the services
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Error fetching services" });
    }
  };
  