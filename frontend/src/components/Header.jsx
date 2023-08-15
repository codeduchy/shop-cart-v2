import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand style={{ display: 'flex' }}>
              <img src={logo}></img>
              ShopCart
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((acc, cur) => acc + Number(cur.qty), 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaShoppingCart /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
