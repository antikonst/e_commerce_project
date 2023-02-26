import "./styles.css";

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

export const Loader = ({
  loading = true,
  size = LoaderSize.m,
  className,
  children,
}: LoaderProps) => {
  const sizes = {
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

  const loaderStyles = {
    width: sizes[size].diametr,
    height: sizes[size].diametr,
    border: `${sizes[size].border} solid #518581`,
    borderLeftColor: "rgba(0, 0, 0, 0)",
  };

  return loading ? (
    <div style={loaderStyles} className={`${className} loader`}>
      {children}
    </div>
  ) : null;
};
