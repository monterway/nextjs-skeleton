const PageLoader = (): JSX.Element | null => {
  return (
    <div className="page-loader">
      <div className="page-loader__spinner spinner-border text-primary" role="status" />
    </div>
  );
};

export default PageLoader;
