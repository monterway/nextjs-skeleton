export interface PageLoaderProps {
  isVisible: boolean;
}

const PageLoader = (props: PageLoaderProps): JSX.Element | null => {
  const { isVisible } = props;

  return (
    <div className={`page-loader ${isVisible ? 'page-loader--visible' : ''}`}>
      <div className="page-loader__spinner spinner-border text-primary" role="status" />
    </div>
  );
};

export default PageLoader;
