import { Container } from 'react-bootstrap';
import NextLink from '../NextLink/NextLink';

export interface Footer1Props {
  title: string;
  buttons: {
    title: string;
    href: string;
  }[];
}

const Footer1 = (props: Footer1Props): JSX.Element => {
  const { title, buttons } = props;

  return (
    <Container>
      <footer className="py-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          {buttons.map((button, index) => (
            <li key={index} className="nav-item">
              <NextLink title={button.title} href={button.href} className="nav-link px-2 text-body-secondary" />
            </li>
          ))}
        </ul>
        <p className="text-center text-body-secondary">{title}</p>
      </footer>
    </Container>
  );
};

export default Footer1;
