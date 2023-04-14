import React, { useState, useEffect, useRef, useContext } from "react";
import { IMG_URL, LOG_IN } from "../../constants";
import { GlobalContext } from "../../context/Provider";
import { signout } from "../../context/actions/auth/auth.action";
import Link from "next/link";
import { ROLES } from "../../constants/enum";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import CustomButton from "../button/customButton";

function TopHeaderBar() {
  const router = useRouter();

  const searchRef = useRef();
  const [loadSpinner, setLoadSpinner] = useState(false);
  const {
    authDispatch,
    authState: { user, isLoggedIn },
  } = useContext(GlobalContext);

  const logOut = () => {
    signout()(authDispatch);
  };

  // window.onbeforeunload = () => {
  //   alert("closing tab");
  //   localStorage.removeItem("user");
  // };
  // window.onunload = () => {
  //   // Clear the local storage
  //   localStorage.removeItem("user");
  // };
  const SearchCarrierAction = async () => {
    //  setLoadSpinner(true);
    router.push(`/carrier/?name=${searchRef.current.value}`);

    // try {
    //   if (res) {
    //     toast.success(res.data.message);
    //     setLoadSpinner(false);
    //   }
    // } catch (err) {
    //   toast.error(err.message);
    //   setLoadSpinner(false);
    // }
  };
  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    //  setUser(JSON.parse(localStorage.getItem("user")));
  }, [isLoggedIn]);
  console.log("user", user);
  console.log("isLoggedIn", isLoggedIn);
  return (
    <>
      {" "}
      <header className="navbar pcoded-header navbar-expand-lg navbar-light header-blue">
        <div className="m-header">
          <a className="mobile-menu" id="mobile-collapse" href="#!">
            <span></span>
          </a>
          <a href="#!" className="b-brand">
            <img
              src="assets/images/logo-small-prod-2.png"
              alt=""
              className="logo-main"
            />
          </a>

          <a href="#!" className="mob-toggler">
            <i className="feather icon-more-vertical"></i>
          </a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li>
              {user && (
                <div className="dropdown drp-user">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="feather icon-user"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right profile-notification">
                    <div className="pro-head">
                      <img
                        src={
                          user.UserPicUrl
                            ? IMG_URL + user?.UserPicUrl
                            : "https://bootdey.com/img/Content/avatar/avatar7.png"
                        }
                        className="img-radius"
                        alt=""
                      />
                      <span style={{ textAlign: "center" }}>
                        {user?.FullName}
                        <br />
                        {ROLES.find((item) => item.value === user?.roles)?.text}
                      </span>
                      <span></span>

                      <Link href="/">
                        <a
                          className="dud-logout"
                          title=" Logout"
                          onClick={logOut}
                        >
                          <i className="feather icon-log-out"></i>
                        </a>
                      </Link>
                    </div>
                    <ul className="pro-body">
                      <li>
                        <Link
                          href={`/user/user-profile?userId=${user?.UserId}`}
                          passHref
                        >
                          <a className="dropdown-item" title="My Profile">
                            <i className="feather icon-user"></i> My Profile
                          </a>
                        </Link>
                      </li>

                      <li>
                        <Link
                          href={`/user/user-subscription-list?userId=${user?.UserId}`}
                          passHref
                        >
                          <a className="dropdown-item" title=" My Subscription">
                            <i className="feather icon-box"></i> My Subscription
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/user/user-rating?userId=${user?.UserId}`}
                          passHref
                        >
                          <a className="dropdown-item" title=" My Ratings">
                            <i className="feather icon-star"></i> My Ratings
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/user/user-document?userId=${user?.UserId}&companyId=${user?.CompanyId}`}
                          passHref
                        >
                          <a className="dropdown-item" title=" My Documents">
                            <i className="feather icon-book"></i> My Documents
                          </a>
                        </Link>
                      </li>
                      {user?.roles === "shipper" && (
                        <li>
                          <Link
                            href={`/user/user-contract?userId=${user?.UserId}&companyId=${user?.CompanyId}`}
                            passHref
                          >
                            <a className="dropdown-item" title=" My Contract">
                              <i className="feather icon-sun"></i> My Contract
                            </a>
                          </Link>
                        </li>
                      )}

                      <li>
                        <Link href={`/my-messages/${user?.UserId}`} passHref>
                          <a className="dropdown-item" title=" My Messages">
                            {" "}
                            <i className="feather icon-mail"></i> My Messages
                          </a>
                        </Link>
                      </li>
                      {/* <li>
                        <a href="#" className="dropdown-item" onClick={LogOut}>
                          <i className="feather icon-lock"></i> Lock Screen
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              )}
            </li>
            <li>
              <div className="dropdown">
                <a className="dropdown-toggle" href="#" data-toggle="dropdown">
                  <i
                    className="icon feather icon-search"
                    title=" Search Carrier Info"
                  ></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right notification">
                  <div className="noti-head">
                    <h6 className="d-inline-block m-b-0">
                      Search Carrier Info
                    </h6>
                  </div>
                  <div className="noti-body">
                    <input
                      type="text"
                      name="txtSearch"
                      className="form-control border-0 shadow-none"
                      placeholder="Search here"
                      ref={searchRef}
                    />
                    <CustomButton
                      caption={"Search"}
                      onClick={SearchCarrierAction}
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default TopHeaderBar;
