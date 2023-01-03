import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Home from "./components/Home";

import { Route, Routes, Link } from "react-router-dom";
import Post from "./components/Post";
import Get from "./components/Get";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="App">
      <h5>USER DATA</h5>
      <Navbar color="dark" light expand="md" md-3>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/Get">Get</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/Post">Post</Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Get" element={<Get />} />
        <Route path="/Post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
