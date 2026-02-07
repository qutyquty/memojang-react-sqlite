import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 fixed-bottom">
      <Container>
        <small>© {new Date().getFullYear()} Movie&Tv Pado App. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default Footer;