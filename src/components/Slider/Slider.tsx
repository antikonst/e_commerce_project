import { FC, useEffect, useRef } from "react";
import { useState } from "react";

import styles from "./Slider.module.scss";

type SliderProps = {
  images?: string[];
  classnames?: string | string[];
};

interface PropsBtn {
  idn: string;
  onclick: () => void;
}

export const Slider = ({ images, classnames }: SliderProps) => {
  const sliderRef = useRef<any>(null);

  const num = images?.length || 0;
  const sliderImgs = images?.map((img, i) => <img key={i} src={img} />);
  const node = sliderRef.current;
  let ar = node?.classList;

  const [cur, setCur] = useState(1);

  useEffect(() => {
    ar?.remove(...ar);
    ar?.add(styles.slider);
    ar?.add(styles[`next${cur}`]);
  }, [cur]);

  const PrevNextBtn: FC<PropsBtn> = ({ idn, onclick }) => {
    return (
      <button onClick={onclick}>
        <div id={idn}></div>
      </button>
    );
  };

  const prevNextJs = (
    <div>
      <PrevNextBtn
        idn={styles.prev}
        onclick={() => setCur(cur === 1 ? num : cur - 1)}
      />
      <PrevNextBtn
        idn={styles.next}
        onclick={() => setCur(cur === num ? 1 : cur + 1)}
      />
    </div>
  );
  const gal = images?.map((img, i) => <s key={i} id={`s${i + 1}`}></s>);

  return (
    <div className={`${styles.CSSgal} ${classnames}`}>
      {gal}
      <div ref={sliderRef} className={styles.slider}>
        {sliderImgs}
      </div>
      <div className={styles.prevNext}>{prevNextJs}</div>
    </div>
  );
};
