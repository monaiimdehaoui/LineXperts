import React from "react";
import {Link} from "react-router-dom";
import './css/navigation.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import NavbarToggle from "react-bootstrap/NavbarToggle";

/*Navigation component Links*/
export default function Navigation() {
    return (
        <>
            <hr id={"nav-hr"}/>
            <Navbar collapseOnSelect className={"nav-style pl-5 pt-1 pb-1"} expand={"lg"}>
                <NavbarToggle aria-controls={"responsive-navbar-nav"}/>
                <Navbar.Collapse id={"responsive-navbar-nav"}>
                    <Nav className="m-auto">
                        <Nav.Link eventKey="1" as={Link} to={"/home"} className="nav-link main-link text-white"> Home
                            Page</Nav.Link>

                        <NavDropdown id={"collapsableBtn-CltContr"} title={"Client & Contract Mng"}>
                            <NavDropdown.Item eventKey="2" as={Link} to={'/client-menu'}>Client Mng
                                Menu</NavDropdown.Item>
                            <NavDropdown.Item eventKey="3" as={Link} to={'/contract-menu'}>Contract Mng
                                Menu</NavDropdown.Item>
                            <NavDropdown.Item eventKey="4" as={Link} to={'/addendum-menu'}>Addendum Mng
                                Menu</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown id={"collapsableBtn-WrkSer"} title={"Workforce & Service Mng"}>
                            <NavDropdown.Item eventKey="5" as={Link} to={"/workforce-menu"}>Workforce Mng
                                Menu</NavDropdown.Item>
                            <NavDropdown.Item eventKey="6" as={Link} to={"/workforce-assign"}>Work Assignment
                                Menu</NavDropdown.Item>
                            <NavDropdown.Item eventKey="7" as={Link} to={"/service-menu"}>Service Mng
                                Menu</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown id={"collapsableBtn-Report"} title={"Report Generation"}>
                            <NavDropdown.Item eventKey="8" as={Link} to={"/not-set"}>Transactional
                                Reports</NavDropdown.Item>
                            <NavDropdown.Item eventKey="9" as={Link} to={"/not-set"}>Service &
                                Workforce</NavDropdown.Item>
                            <NavDropdown.Item eventKey="10" as={Link} to={"/not-set"}>Performance and
                                KPI</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link eventKey="11" as={Link} to={"/data-import"} className="text-white main-link">Data
                            Import</Nav.Link>
                        <Nav.Link eventKey="12" as={Link} to={"/test-api"} className="text-white main-link">Test
                            API </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

