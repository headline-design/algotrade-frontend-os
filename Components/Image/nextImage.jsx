import React, { useState, useEffect } from "react";
import Image from "next/image";

const ImageWithFallback = (props) => {
  const { src, fallbackSrc, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
      <Image
        {...rest}
        src={imgSrc}
        alt={alt}
        onError={() => {
          setImgSrc("https://algotrade.app/placeholder.png");
        }}
      />
  );
};

export default ImageWithFallback;
