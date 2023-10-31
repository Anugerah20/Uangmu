import { NavLink, useLocation } from "react-router-dom";
import { Navbar } from 'flowbite-react';
import { useState, useEffect } from "react";

export default function Navigation() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");

  // Navbar active
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Navbar
        fluid
        rounded
        className="my-2 sm:my-5 shadow-sm"
      >
        <Navbar.Brand
          href="/"
        >
          <span className="self-center whitespace-nowrap text-4xl sm:text-4xl font-semibold dark:text-white">
            Uangmu
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            as={NavLink}
            to="/"
            className={activeLink === "/" ? "active" : ""}
          >
            <p className="hover:text-gray-700">Beranda</p>
          </Navbar.Link>
          <Navbar.Link
            as={NavLink}
            to="/takenotes"
            className={activeLink === "/takenotes" ? "active" : ""}
          >
            <p className="hover:text-gray-700"> Buat Catatan</p>
          </Navbar.Link>
          <Navbar.Link
            as={NavLink}
            to="/contact"
            className={activeLink === "/contact" ? "active" : ""}
          >
            <p className="hover:text-gray-700">Kontak</p>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
