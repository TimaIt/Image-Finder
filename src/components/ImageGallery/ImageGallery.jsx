import React from "react";
import ImageGalleryItem from "../ImageGalleryItem";

const ImageGallery = ({ images, showModal }) => {
  const ImageElem = images.map((image) => (
    <ImageGalleryItem key={image.id} {...image} showModal={showModal} />
  ));
  return (
    <>
      <ul className="ImageGallery">{ImageElem}</ul>
    </>
  );
};

export default ImageGallery;
