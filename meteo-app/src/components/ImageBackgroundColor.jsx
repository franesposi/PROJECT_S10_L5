import { useEffect, useState } from "react";
import Vibrant from "node-vibrant";

const ImageBackgroundColor = (props) => {
  const [backgroundColor, setBackgroundColor] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.src = props.imageUrl;

    image.onload = async () => {
      const vibrant = new Vibrant(image);
      const swatches = vibrant.swatches();
      const backgroundColor = swatches.Vibrant.getHex();
      setBackgroundColor(backgroundColor);
    };
  }, [props.imageUrl]);

  return backgroundColor;
};

export default ImageBackgroundColor;
