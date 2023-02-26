import { useContext } from "react";

import { ProductContext } from "@context/context";
import { Link, NavLink } from "react-router-dom";

import hamburger from "./imgs/hamburger.svg";
import logo from "./imgs/logo.svg";
import bag from "./imgs/shopCart.svg";
import user from "./imgs/user.svg";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const { setProductState } = useContext<any>(ProductContext);
  return (
    <div className={styles.navbar}>
      <Link to={"/"}>
        <img
          src={logo}
          className={styles.navbar_logo}
          onClick={() => setProductState(true)}
        />
      </Link>
      <div className={styles.navbar_menu}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.navbar_link_active : styles.navbar_link
          }
          to="/"
        >
          Products
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.navbar_link_active : styles.navbar_link
          }
          to="/categories"
        >
          Categories
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.navbar_link_active : styles.navbar_link
          }
          to="/aboutus"
        >
          About Us
        </NavLink>
      </div>
      <div className={styles.navbar_right}>
        <button>
          <img src={bag} className={styles.bag} />
        </button>
        <button>
          <img src={user} />
        </button>
      </div>
      <button className={styles.hamburger_div}>
        <img src={hamburger} className={styles.hamburger} />
      </button>
    </div>
  );
};
