import { useState, useEffect, useRef } from "react";
//import { Link } from "react-router-dom";
import Link from 'next/link'

import Submenu from "./navbar-vertical-submenu";

const Menu = ({ key,id, items, user }) => {
  return (
    <li
    id={id}
      key={key}
      className={items.submenu ? "nav-item pcoded-hasmenu" : "nav-item"}
    >
      {items.submenu ? (
        <>
          <a href="#" className="nav-link ">
            <span className="pcoded-micon">
              <i className={items.icon}></i>
            </span>
            <span className="pcoded-mtext">{items.title}</span>
          </a>

          <Submenu submenus={items.submenu} user={user} />
        </>
      ) : (
        <>
         <Link href={items.path} >
           <a className="nav-link ">
            <span className="pcoded-micon">
              <i className={items.icon}></i>
            </span>
            <span className="pcoded-mtext">{items.title}</span>
          </a>
                </Link>
        
        </>
      )}
    </li>
  );
};

export default Menu;
