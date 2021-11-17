import React from "react";
import Image from "../image/Image";
import styles from './gallery.module.css'

const Gallery = ({ images }) => {
  return (
    <div className={styles.gridContainer}>
      {images.map((image, key) => {
        return <Image imageDetails={image} key={key} />;
      })}
    </div>
  );
};

export default Gallery;
