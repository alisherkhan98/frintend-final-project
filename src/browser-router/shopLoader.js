// images
import bg from "../assets/img/hero2.jpg";

// loader function
export default function shopLoader() {
  let image = new Image();
  image.src = bg;
  return image;
}
