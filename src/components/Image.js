import React from "react";

const Image = ({ image }) => {
  return (
    <div className="image-card">
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default Image;
