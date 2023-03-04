import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../../context/Provider";
import SideLinkMenu from "./sideLinkMenu";
import { menuData } from "./sideLinkData";

const SideLink = () => {
  const {
    authDispatch,
    authState: { user },
  } = useContext(GlobalContext);

  // useEffect(() => {
  //   let controller = new AbortController();
  //   return () => controller?.abort();

  // }, []);
  // console.log('menuData', menuData)
  return (
    <>
      <SideLinkMenu menudata={menuData(user)} />{" "}
      {/* 
       {(user.roles === "carrier" && <SideLinkCarrier />) ||
        (user.roles === "shipper" && <SideLinkShipper />) ||
        (user.roles === "broker" && <SideLinkShipper />) ||
        (user.roles === "audit" && <SideLinkAdmin />) ||
        (user.roles === "admin" && <SideLinkAdmin />) || <SideLinkAdmin />} */}
    </>
  );
};

export default SideLink;
