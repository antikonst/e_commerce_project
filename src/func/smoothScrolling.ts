import { useEffect, useState } from "react";

export const useSmoothScrolling = (
  hidden = ".hidden",
  elementShow = "element-show"
) => {
  const [trash, setTrash] = useState(0.2);
  useEffect(() => {
    let windowheight = window.innerHeight / 4;
    let heightblock;
    const onEntry = (entry: any[]) => {
      entry.forEach((change) => {
        if (change.isIntersecting) {
          change.target.classList.add(elementShow);
          heightblock = change.boundingClientRect.height;
          setTrash(
            windowheight / heightblock > 0.5 ? 0.5 : windowheight / heightblock
          );
        }
      });
    };

    let options = { threshold: [trash] };
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll(hidden);

    for (let elm of elements) {
      observer.observe(elm);
    }
  }, [trash]);
};
