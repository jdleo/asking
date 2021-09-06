import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import useWindowDimensions from '../helpers/useWindowDimensions';

export default function NavbarWrapper() {
  // state mgmt
  const { width } = useWindowDimensions();

  return (
    <Navbar style={width > 500 ? styles.navbarBig : { paddingLeft: 16 }} className='navbar-main'>
      <Navbar.Brand href='/' className='navbar-brand' style={styles.navbarBrand}>
        {process.env['APP_NAME'] ?? 'asking.fr'}
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className='justify-content-end navbar-links'>
        <Nav.Link href='https://github.com/jdleo/asking' target='_blank' style={styles.navbarLink}>
          Github
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

const styles = {
  navbarBig: { paddingLeft: 200, paddingRight: 200 },
  navbarBrand: {
    color: '#050505',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  },
  navbarLink: {
    color: '#050505',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  },
};
