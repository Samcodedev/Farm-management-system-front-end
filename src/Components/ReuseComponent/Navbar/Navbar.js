import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link, useNavigate, withRouter} from 'react-router-dom'

function Navication() {
  let [unValidate, unValidateFunc] = useState(false)
  let [isAdmin, isAdminFunc] = useState(null)

  let token = localStorage.getItem('accessToken')
  let validationToken = localStorage.getItem('validationToken')
  console.log(validationToken);

  function callValidation(){
    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
    };
    console.log(parseJwt(token || validationToken));

    console.log('workng');
    if(parseJwt(token || validationToken).exp * 1000 > Date.now()){
      unValidateFunc(true)
    }
    else{
      unValidateFunc(false)
    }
    if(parseJwt(token || validationToken).user.role === 'farmer'){
      isAdminFunc(true)
    }
    else if(parseJwt(token || validationToken).user.role === 'client'){
      isAdminFunc(false)
    }
    else{
      isAdminFunc(false)
    }
  }

  useEffect(()=>{
    // callValidation()
  })

  const navigate = useNavigate()

  function logout(){
    localStorage.removeItem('accessToken')
    navigate('/')
  }

  function profileRoute(){
    if(token || validationToken){
      navigate('/AdminProfile')
    }
    else{
      navigate('/Login')
    }
  }

  function CreateStockRoute(){
    if(token || validationToken){
      navigate('/CreateStock')
    }
    else{
      navigate('/Login')
    }
  }

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={callValidation} />
            <Navbar.Brand href="#">Farm management system</Navbar.Brand>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  FMS
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                  <Nav.Link style={{display: token? 'block' : 'none'}} onClick={profileRoute}>Dashboard</Nav.Link>
                  <Nav.Link><Link to='/Categories'>Available Stock</Link></Nav.Link>
                  <Nav.Link style={{display: unValidate === false && isAdmin? 'block' : 'none'}} ><Link to='/DataTable'>Stock Data Table</Link></Nav.Link>
                  <Nav.Link style={{display: unValidate === false && isAdmin? 'block' : 'none'}} onClick={CreateStockRoute}>Create Stock</Nav.Link>
                  <Nav.Link style={{display: isAdmin === true || !token ? 'none' : 'block'}} ><Link to='/Cart'>Cart</Link></Nav.Link>
                  {/* <Nav.Link><Link to='/'>About Us</Link></Nav.Link>
                  <Nav.Link href="#action2">Contact Us</Nav.Link> */}
                  <NavDropdown
                    title="More options"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item style={{display: token? 'none' : 'block'}}><Link to="/Login">LogIn</Link></NavDropdown.Item>
                    <NavDropdown.Item to="#action4" style={{display: token? 'none' : 'block'}}>
                      <Link to='/Register'>Register</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider style={{display: token? 'block' : 'none'}} />
                    <NavDropdown.Item style={{display: token? 'block' : 'none'}} href="#action5" onClick={logout}>
                      LogOut
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Navication;