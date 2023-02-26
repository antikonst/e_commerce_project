import { useMatch } from "react-router-dom";

import styles from "./PageName.module.scss";

export const PageName = () => {
  const route = useMatch("/:id");
  const path = route ? route.pathname : "/product";

  const pathes: any = {
    "/product": "Products",
    "/aboutus": "About Us",
    "/categories": "Categories",
  };
  const pathName = pathes[`${path}`];

  return <div className={styles.pathname}>{pathName}</div>;
};
