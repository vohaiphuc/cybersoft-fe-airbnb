import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyImage = ({ src, alt, className }) => (
  <LazyLoadImage
    alt={alt}
    src={src}
    className={className}
    effect="blur"
    width="100%"
    placeholderSrc="https://cdn1.vectorstock.com/i/1000x1000/72/20/loading-icon-template-update-or-symbol-vector-31047220.jpg"
  />
);

export default React.memo(LazyImage);
