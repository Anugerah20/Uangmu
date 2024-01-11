import { Link, NavLink, useLocation } from "react-router-dom";
import { Navbar } from 'flowbite-react';
import { useState, useEffect } from "react";
import DropdownNavigation from "./DropdownNavigation";

export default function Navigation() {

  // Check Token User
  const userToken = localStorage.getItem("tokenUser");
  console.log("USER TOKEN: ", userToken);
  const userLogin = userToken ? true : false;

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
        className="my-3 lg:my-3 md:my-3 shadow-sm"
      >
        <Navbar.Brand
          href="/"
        >
          <span className="mb-2 self-center whitespace-nowrap text-4xl sm:text-4xl font-semibold text-sky-600 dark:text-white">
            Uangmu
          </span>
        </Navbar.Brand>
        {userLogin && (
          <div className="sm:visible lg:invisible md:invisible ms-32 md:ms-0 lg:ms-0">
            <DropdownNavigation />
          </div>
        )}
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            as={NavLink}
            to="/"
            className={`lg:mt-3 md:mt-3 mt-0 text-sky-600 font-normal ${activeLink === "/" ? "active" : ""}`}
          >
            <p>Beranda</p>
          </Navbar.Link>
          <Navbar.Link
            as={NavLink}
            to="/takenotes"
            className={`lg:mt-3 md:mt-3 mt-0 text-sky-600 font-normal ${activeLink === "/takenotes" ? "active" : ""}`}
          >
            <p>Buat Catatan</p>
          </Navbar.Link>
          <Navbar.Link
            as={NavLink}
            to="/contact"
            className={`lg:mt-3 md:mt-3 mt-0 text-sky-600 font-normal ${activeLink === "/contact" ? "active" : ""}`}
          >
            <p>Kontak</p>
          </Navbar.Link>

          {userLogin ? (
            <div className="invisible md:visible lg:visible">
              <DropdownNavigation />
            </div>
          ) : (
            <div>
              <Link to="login">
                <button className="btn-navigation">
                  Login
                </button>
              </Link>
            </div>
          )}

        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
