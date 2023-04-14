import NavBar from "../navbar/navbar";
import TopHeaderBar from "./top-header-bar";

import React from "react";
import dynamic from "next/dynamic";

function Header() {
  return (
    <>
      <NavBar />
      <TopHeaderBar />

      {/*   <div class="page-header">
        <div class="page-block">
          <div class="row align-items-center">
             <div class="col-md-12">
              <div class="page-header-title">
                <h5 class="m-b-10">Horizontal Layout 2</h5>
              </div>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="index.html">
                    <i class="feather icon-home"></i>
                  </a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#!">Page Layout</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#!">Horizontal Layout 2</a>
                </li>
              </ul>
            </div> 
          </div>
        </div>
      </div>*/}
    </>
  );
}

//export default Header;
export default dynamic(() => Promise.resolve(Header), { ssr: false });
