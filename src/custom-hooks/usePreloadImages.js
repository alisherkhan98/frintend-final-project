import React from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setAreImagesLoaded } from "../redux/features/loadingSlice";
// images
import hero from "../assets/img/hero.jpg";
import hero2 from "../assets/img/hero2.jpg";
function usePreloadImages() {
  const imagesArray = [hero, hero2];
  const { areImagesLoaded } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  imagesArray.forEach((imageSrc) => {
    let imageObj = new Image();
    imageObj.src = imageSrc;
  });

  dispatch(setAreImagesLoaded(true));
  return areImagesLoaded;
}

export default usePreloadImages;
