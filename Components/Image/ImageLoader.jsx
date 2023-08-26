import Image from "next/image";

const ImageLoader = (props) => {
  const { src, fallbackSrc, alt, ...rest } = props;

  const ASSET_LOGO_BASE_URL = "https://img.algotrade.net";
  const ASSET_LOGO_BASE_URLL = "https://asa-list.tinyman.org";

  const myLoader = ({ src, width, quality, height }) => {
    let options = "";
    if (width) options = `width=${width}`;
    if (height) options = options + `&height=${height}`;
    if (quality) options = options + `&height=${quality}`;
    return `${ASSET_LOGO_BASE_URL}/image.png?mode=fit&${options}&origin=${ASSET_LOGO_BASE_URLL}/assets/${src}/icon.png`;

    // return `${ASSET_LOGO_BASE_URL}/${src}/icon.png`;
  };
  return <Image mode={"fit"} loader={myLoader} {...rest} src={src} alt={alt} />;
};

export default ImageLoader;
