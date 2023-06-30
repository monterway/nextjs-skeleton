import Header from "../Header/Header";

export interface PageProps {
  children: JSX.Element;
}

const Page = (props: PageProps): JSX.Element => {
  const {
    children,
  } = props;

  return (
    <div>
      <Header/>
      { children }
      <h1>Footer</h1>
    </div>
  );
};

export default Page;
