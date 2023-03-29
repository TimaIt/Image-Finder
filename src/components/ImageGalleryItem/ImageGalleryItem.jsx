import React from "react";

const ImageGalleryItem = ({ webformatURL, largeImageURL, showModal }) => {
  return (
    <>
      <li onClick={() => showModal(largeImageURL)} className="ImageGalleryItem">
        <img className="ImageGalleryItem-image" src={webformatURL} alt="" />
      </li>
    </>
  );
};

export default ImageGalleryItem;
