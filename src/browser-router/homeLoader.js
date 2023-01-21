// image
import bg from "../assets/img/hero.jpg";

// loader function
export default async function homeLoader() {
  let image = new Image();
  image.src = bg;
  return image;
}
