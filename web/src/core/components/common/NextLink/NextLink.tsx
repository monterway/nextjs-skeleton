import Link from 'next/link';

export interface NextLinkProps {
  children: string|JSX.Element;
  href: string;
}

const NextLink = (props: NextLinkProps): JSX.Element => {
  const { children, href } = props;

  return (
    <Link href={href} passHref={true}>
      { children }
    </Link>
  );
};

export default NextLink;
