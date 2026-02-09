import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 fixed-bottom">
      <Container>
        <small>© {new Date().getFullYear()} 달력 To Do App. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default Footer;