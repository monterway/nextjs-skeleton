import { Container, Nav, Navbar } from 'react-bootstrap';
import NextLink from '../NextLink/NextLink';

export interface Header1Props {
  title: string;
  buttons: {
    title: string;
    href: string;
  }[];
}

const Header1 = (props: Header1Props): JSX.Element => {
  const { title, buttons } = props;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NextLink title={title} href="/" className="navbar-brand" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {buttons.map((button, index) => (
              <NextLink key={index} title={button.title} href={button.href} className="nav-link" />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header1;
