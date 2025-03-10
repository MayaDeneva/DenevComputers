const axios = require("axios");
const xml2js = require("xml2js");
const Product = require("../models/productModel");
require("dotenv")

const fetchAndSyncProducts = async () => {
  try {
    const response = await axios.get(process.env.XML_FEED);

    // Parse the XML data
    xml2js.parseString(response.data, async (err, result) => {
      if (err) {
        throw new Error("Error parsing XML: " + err);
      }

      const products = result.shop.product;
      console.log("Fetched products:", products.length);

      for (const productData of products) {
        const productId = productData.id[0];
        const productTitle = productData.name[0];
        const productCategory = productData.category_id[0];

        // Handle the primary image (images_url)
        const productMainImage = productData.images_url?.[0]; 

        // Handle the additional images (allimages_urls)
        const productImages = productData.allimages_urls
          ? productData.allimages_urls[0].split(";").map((url) => url.trim()) // Split the URLs by semicolon
          : [];

        // Combine both primary and additional images into a single array
        const allProductImages = productMainImage ? [productMainImage, ...productImages] : productImages;

        const productOldPrice = productData.old_price[0];
        const productPrice = parseFloat(productData.recommended_price[0]);
        const productStock = productData.instock[0];
        const productFeatures = productData.features?.[0] || "";
        const productNumber = productData.part_number?.[0];
        const productAttributes = productData.attributes?.[0]?.attribute.map(attr => ({
          name: attr.aname[0],  
          value: attr.avalue[0] 
        })) || [];

        // Skip if any crucial data is missing
        if (!productTitle || !productPrice || !productCategory) {
          console.log(`Skipping product with missing data: ${productId}`);
          return; // Skip this product
        }

        // Log the product being processed
        console.log(`Processing product ID: ${productId} - ${productTitle}`);

        // Update or insert product in MongoDB
        await Product.findOneAndUpdate(
          { _id: productId },
          {
            $set: {
              title: productTitle,
              price: productPrice,
              old_price: productOldPrice,
              image: allProductImages, // Store images as an array
              category: productCategory,
              instock: productStock,
              features: productFeatures,
              part_number: productNumber,
              attributes: productAttributes,
            },
          },
          { upsert: true, new: true } // Create if not found
        );
      };

      console.log("Products synced successfully!");
    });
  } catch (err) {
    console.error("Error syncing products:", err);
  }
};

module.exports = fetchAndSyncProducts;
