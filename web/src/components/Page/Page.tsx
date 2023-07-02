import Header1 from '../Header1/Header1';
import Footer1 from '../Footer1/Footer1';

export interface PageProps {
  children: JSX.Element | JSX.Element[];
}

const Page = (props: PageProps): JSX.Element => {
  const { children } = props;

  return (
    <div>
      <Header1 title={''} buttons={[]} />
      {children}
      <Footer1 title={''} buttons={[]} />
    </div>
  );
};

export default Page;
