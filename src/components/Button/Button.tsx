import React from "react";

import cn from "classnames";

import styles from "./Btn.module.scss";
import { Loader, LoaderSize } from "../Loader/Loader";

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children = "Cancel",
  loading,
  onClick = () => null,
  ...props
}) => {
  const disabled = props.disabled || loading;

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "button",
        props.className,
        styles.button,
        disabled && styles[`button_disabled`],
        loading && styles["button_loader"]
      )}
    >
      {loading && (
        <Loader
          size={LoaderSize.s}
          loading={loading}
          className={styles.btnLoader}
        />
      )}
      {children}
    </button>
  );
};
