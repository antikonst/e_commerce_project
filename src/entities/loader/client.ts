export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
  children?: any;
};

export const sizes = {
  s: {
    diametr: "14px",
    border: "3px",
  },
  m: {
    diametr: "32px",
    border: "4px",
  },
  l: {
    diametr: "48px",
    border: "6px",
  },
};
