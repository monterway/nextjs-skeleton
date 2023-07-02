import Link from 'next/link';

export interface NextLinkProps {
  title: string | JSX.Element;
  href: string;
  className?: string;
}

const NextLink = (props: NextLinkProps): JSX.Element => {
  const { title, href, className = '' } = props;

  return (
    <Link href={href}>
      <a className={className}>{title}</a>
    </Link>
  );
};

export default NextLink;
