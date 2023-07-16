import Link from 'next/link';

export interface NextLinkProps {
  title: string | JSX.Element;
  href: string;
  passHref?: boolean;
  className?: string;
}

const NextLink = (props: NextLinkProps): JSX.Element => {
  const { title, href, passHref = false, className = '' } = props;

  return (
    <Link href={href} passHref={passHref}>
      <a className={`next-link ${className}`}>{title}</a>
    </Link>
  );
};

export default NextLink;
