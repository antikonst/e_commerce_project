import { useEffect, useRef } from "react";
import { useState } from "react";

import styles from "./Slider.module.scss";
import "./style.css";

type SliderProps = {
  images?: string[];
  classnames?: string | string[];
};

export const Slider = ({ images, classnames }: SliderProps) => {
  const sliderRef = useRef<any>(null);

  const num = images?.length || 0;
  const sliderImgs = images?.map((img, i) => <img key={i} src={img} />);
  const node = sliderRef.current;
  let ar = node?.classList;

  const [cur, setCur] = useState(1);

  useEffect(() => {
    ar?.remove(...ar);
    ar?.add("slider");
    ar?.add(`next${cur}`);
  }, [cur]);

  const prevNextJs = (
    <div>
      <button
        onClick={() => {
          setCur(cur === 1 ? num : cur - 1);
        }}
      >
        <div id="prev"></div>
      </button>
      <button
        onClick={() => {
          setCur(cur === num ? 1 : cur + 1);
        }}
      >
        <div id="next"></div>
      </button>
    </div>
  );
  const gal = images?.map((img, i) => <s key={i} id={`s${i + 1}`}></s>);

  return (
    <div className={`CSSgal ${classnames}`}>
      {gal}
      <div ref={sliderRef} className="slider">
        {sliderImgs}
      </div>
      <div className="prevNext">{prevNextJs}</div>
    </div>
  );
};
