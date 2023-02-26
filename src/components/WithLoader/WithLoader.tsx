import { Loader, LoaderSize } from "../Loader/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader = ({ children, loading }: WithLoaderProps) => {
  return (
    <div
      style={{ position: "relative", display: "inline-block", margin: "1em" }}
    >
      {children}
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Loader loading={loading} size={LoaderSize.m} />
        </div>
      ) : null}
    </div>
  );
};
