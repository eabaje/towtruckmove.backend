import React, { useState, useEffect, useContext } from "react";
//import "./navbar.scss";
import Link from "next/link";
import $ from "jquery";
import "./pcoded";
import { GlobalContext } from "../../context/Provider";
import Menu from "./vertical/navbar-vertical-menu";
import {
  menuItemsAdmin,
  menuItemsAudit,
  menuItemsCarrier,
  menuItemsDriver,
  menuItemsPublic,
  menuItemsShipper,
} from "./vertical/sidebarData";
import { IMG_URL } from "../../constants";
import { ROLES } from "../../constants/enum";

const NavBar = () => {
  const {
    authState: { user },
  } = useContext(GlobalContext);
  //  const { dispatch } = useContext(AuthContext);

  //assigning location variable
  // const location = useLocation();

  //destructuring pathname from location
  // const { pathname } = location;

  // //Javascript split method to get the name of the path in array
  // const splitLocation = pathname.split("/");

  const handleMenu = () => {
    togglemenu();
    // if ($('body').hasclassName('layout-6') || $('body').hasclassName('layout-7')) {
    //     togglemenulayout();
    // }
    // menuhrres();
    var vw = $(window)[0].innerWidth;
    $(document).ready(function () {
      $("#pcoded").pcodedmenu({
        // themelayout: "vertical",
        MenuTrigger: "click",
        SubMenuTrigger: "click",
      });

      $("#mobile-collapse,#mobile-collapse1").click(function (e) {
        var vw = $(window)[0].innerWidth;
        if (vw < 992) {
          $(".pcoded-navbar").toggleClass("mob-open");
          e.stopPropagation();
        }
      });

      $(".mobile-menu").on("click", function () {
        var $this = $(this);
        $this.toggleClass("on");
      });
      $("#mobile-collapse").on("click", function () {
        if (vw > 991) {
          $(".pcoded-navbar:not(.theme-horizontal)").toggleClass(
            "navbar-collapsed"
          );
        }
      });
    });

    // $(window).resize(function () {
    // togglemenu();
    // menuhrres();
    // if ($('body').hasclass('layout-6') || $('body').hasclass('layout-7')) {
    //     togglemenulayout();
    // }
    //  });

    function togglemenu() {
      var vw = $(window)[0].innerWidth;
      if ($(".pcoded-navbar").hasClass("theme-horizontal") === false) {
        if (vw <= 1200 && vw >= 992) {
          $(".pcoded-navbar:not(.theme-horizontal)").addClass(
            "navbar-collapsed"
          );
        }
        if (vw < 992) {
          $(".pcoded-navbar:not(.theme-horizontal)").removeClass(
            "navbar-collapsed"
          );
        }
      }
    }
  };
  const a = 1;
  useEffect(() => {
    //let controller = new AbortController();
    if (typeof window !== "undefined") {
      handleMenu();
    }
    // user===null &&  history.push(`sigin`)
    //  setUser(JSON.parse(localStorage.getItem("user")));
    //  return () => controller?.abort();
  }, [a]);

  return (
    <>
      {/* {(user.roles === "carrier" && <NavBarCarrier />) ||
        (user.roles === "shipper" && <NavBarShipper />) ||
        (user.roles === "broker" && <NavBarShipper />) ||
        (user.roles === "driver" && <NavBarDriver />) ||
        (user.roles === "audit" && <NavBarAdmin />) ||
        (user.roles === "admin" && <NavBarAdmin />) || <NavBarPublic />} */}

      <nav className="pcoded-navbar menu-light ">
        <div className="navbar-wrapper  ">
          <div className="navbar-content scroll-div ">
            <div className="">
              <div className="main-menu-header">
                <img
                  className="img-radius"
                  src={
                    user?.UserPicUrl
                      ? IMG_URL + user?.UserPicUrl
                      : "https://bootdey.com/img/Content/avatar/avatar7.png"
                  }
                  alt="User-Profile-Image"
                />
                <div className="user-details">
                  <div id="more-details">
                    {ROLES.find((item) => item.value === user?.roles).text}{" "}
                  </div>
                </div>
              </div>
              {/* <div className="collapse" id="nav-user-link">
                <ul className="list-unstyled">
                  <li className="list-group-item">
                    <a href="user-profile.html">
                      <i className="feather icon-user m-r-5"></i>View Profile
                    </a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!">
                      <i className="feather icon-settings m-r-5"></i>Settings
                    </a>
                  </li>
                  <li className="list-group-item">
                    <a href="auth-normal-sign-in.html">
                      <i className="feather icon-log-out m-r-5"></i>Logout
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>

            <ul className="nav pcoded-inner-navbar ">
              {/* {
                  user.isActivated === false && user.roles !== "admin" 
                  ? menuItemsAudit(user).map((menu, index) => {
                    return <Menu id={index} items={menu} user={user} />
                  })
                  : user.isExpired === true 
                  
                  ? menuItemsPublic(user).map((menu, index) => {
                    return <Menu id={index} items={menu} user={user} />;
                  })
                  : user.roles === "carrier"
                  ?
                  menuItemsCarrier(user).map((menu, index) => {
                    return <Menu id={index} items={menu} user={user} />;
                  })
                  : user.roles === "driver"
                  ?
                  menuItemsDriver(user).map((menu, index) => {
                    return <Menu id={index} items={menu} user={user} />;
                  })
                  : user.roles === "shipper"
                  ?
                  menuItemsShipper(user).map((menu, index) => {
                    return <Menu id={index} items={menu} user={user} />;
                  })
                  :
                  user.roles === "admin" 
                  &&
                  menuItemsAdmin(user).map((menu, index) => {
                    return <Menu id={index} items={menu} user={user} />;
                  })
                  
                } */}

              {/* {user.isActivated === false &&
                menuItemsPublic(user).map((menu, index) => {
                  return (
                    <Menu key={index} id={index} items={menu} user={user} />
                  );
                })} */}

              {user?.isExpired === true &&
                menuItemsPublic(user).map((menu, index) => {
                  return (
                    <Menu key={index} id={index} items={menu} user={user} />
                  );
                })}

              {user?.roles === "carrier" &&
                menuItemsCarrier(user).map((menu, index) => {
                  return (
                    <Menu key={index} id={index} items={menu} user={user} />
                  );
                })}

              {user?.roles === "driver" &&
                menuItemsDriver(user).map((menu, index) => {
                  return (
                    <Menu key={index} id={index} items={menu} user={user} />
                  );
                })}

              {user?.roles === "shipper" &&
                menuItemsShipper(user).map((menu, index) => {
                  return (
                    <Menu key={index} id={index} items={menu} user={user} />
                  );
                })}

              {user?.roles === "admin" &&
                menuItemsAdmin(user).map((menu, index) => {
                  return (
                    <Menu key={index} id={index} items={menu} user={user} />
                  );
                })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
