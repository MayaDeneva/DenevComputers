import React, { useState } from "react";

const ProductImages = ({ images }) => {
  // Filter out invalid or empty image links
  const validImages = images.filter((img) => img && img.startsWith("http"));

  const [active, setActive] = useState(validImages[0]); // Set the first valid image as active by default

  return (
    <div className="grid gap-4 lg:w-1/2 sm:w-full">
      {/* Main Image */}
      <div>
        <img
          className="w-full max-w-full border rounded-md object-contain object-center md:h-[400px] sm:h-[250px] h-[200px]"
          src={active}
          alt="Active Product Image"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2">
        {validImages.map((imgelink, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className="h-16  sm:h-20 lg:h-24 w-full cursor-pointer rounded-md object-cover object-center"
              alt={`Product Gallery Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
