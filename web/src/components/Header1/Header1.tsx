import { Container, Nav, Navbar } from 'react-bootstrap';
import NextLink from '../NextLink/NextLink';
import UserContext from '../../contexts/UserContext';
import React from 'react';
import GoogleSignInButton1 from '../GoogleSignInButton1/GoogleSignInButton1';

export interface Header1Props {
  title: string;
  buttons: {
    icon?: string;
    title: string;
    href: string;
    position?: 'left' | 'right';
    className?: string;
  }[];
  hasAccount?: boolean;
}

const Header1 = (props: Header1Props): JSX.Element => {
  const { title, buttons, hasAccount = true } = props;
  const user = React.useContext(UserContext);
  const profileElement = hasAccount ? (
    user ? (
      <NextLink
        title={
          <button className="btn btn-primary">
            <i className="bi bi-person-circle"></i>
          </button>
        }
        href="/profile"
      />
    ) : (
      <GoogleSignInButton1 />
    )
  ) : null;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NextLink title={title} href="/" className="navbar-brand" />
        {buttons.length ? (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {buttons
                  .filter((button) => !button.position || (button.position && button.position === 'left'))
                  .map((button, index) => (
                    <NextLink
                      key={index}
                      title={
                        <div>
                          {button.icon ? <i className={`bi bi-${button.icon} me-2`}></i> : null}
                          <span>{button.title}</span>
                        </div>
                      }
                      href={button.href}
                      className={button.className ? button.className : 'nav-link'}
                    />
                  ))}
              </Nav>
              <Nav>
                {buttons
                  .filter((button) => button.position && button.position === 'right')
                  .map((button, index) => (
                    <NextLink
                      key={index}
                      title={
                        <div>
                          {button.icon ? <i className={`bi bi-${button.icon} me-2`}></i> : null}
                          <span>{button.title}</span>
                        </div>
                      }
                      href={button.href}
                      className={button.className ? button.className : 'nav-link'}
                    />
                  ))}
                {profileElement}
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          profileElement
        )}
      </Container>
    </Navbar>
  );
};

export default Header1;
