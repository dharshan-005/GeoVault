import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [isDrawerOpen, setDrawerIsOpen] = useState(false);
  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <Backdrop onClick={closeDrawer} />
            
            <SideDrawer show={isDrawerOpen}>
              <nav className="main-navigation__drawer-nav">
                <NavLinks onClick={closeDrawer} />
              </nav>
            </SideDrawer>
          </>
        )}
      </AnimatePresence>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">GeoVault</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
