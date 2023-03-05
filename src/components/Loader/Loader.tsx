import { LoaderProps, LoaderSize, sizes } from "@entities/loader/client";
import "./styles.css";

export const Loader = ({
  loading = true,
  size = LoaderSize.m,
  className,
  children,
}: LoaderProps) => {
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
export { LoaderSize };
