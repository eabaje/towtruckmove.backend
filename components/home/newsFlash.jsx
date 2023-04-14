import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

function NewsFlash({ dataShipment, dataInterest, user }) {
  //console.log(`data`, dataLengthInterest);
  return (
    <>
      <div className="grey-bg container-fluid">
        <section id="stats-subtitle">
          <div className="row">
            <div className="col-12 mt-3 mb-1">
              <h4 className="text-uppercase">DASHBOARD SUMMARY</h4>
              <hr />
              {/* <p>Statistics on minimal cards with Title &amp; Sub Title.</p> */}
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="card overflow-hidden">
                <div className="card-content">
                  <div className="card-body cleartfix">
                    <div className="media align-items-stretch">
                      <div className="align-self-center">
                        <i className="first fas fa-globe font-large-2 mr-2"></i>
                      </div>
                      <div className="media-body">
                        <h6>Total Shipment Post</h6>
                        <Link
                          href={
                            user.roles === "shipper"
                              ? "/shipment/?userId=" + user.UserId
                              : user.roles === "carrier"
                              ? "/shipment/?companyId=" + user.CompanyId
                              : "/shipment/"
                          }
                        >
                          <a>
                            <span>click for more details</span>
                          </a>
                        </Link>
                      </div>
                      <div className="align-self-center">
                        <h6>{dataShipment.data?.length || 0}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body cleartfix">
                    <div className="media align-items-stretch">
                      <div className="align-self-center">
                        <i className="first fas fa-eye font-large-2 mr-2"></i>
                      </div>
                      <div className="media-body">
                        <h6>Total Shipment Interest</h6>
                        <Link
                          href={
                            user.roles === "shipper"
                              ? "/shipment/?userId=" + user.UserId
                              : user.roles === "carrier"
                              ? "/shipment/?companyId=" + user.CompanyId
                              : "/shipment/"
                          }
                        >
                          <a>
                            <span>click for more details</span>
                          </a>
                        </Link>
                      </div>
                      <div className="align-self-center">
                        <h6>{dataInterest.data?.length || 0}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="card overflow-hidden">
                <div className="card-content">
                  <div className="card-body cleartfix">
                    <div className="media align-items-stretch">
                      <div className="align-self-center">
                        <i className="first fas fa-handshake-o  font-large-2 mr-2"></i>
                      </div>
                      <div className="media-body">
                        <h6>Total Shipment Assigned</h6>
                        <Link
                          href={
                            user.roles === "shipper"
                              ? "/shipment/?userId=" + user.UserId
                              : user.roles === "carrier"
                              ? "/shipment/?companyId=" + user.CompanyId
                              : "/shipment/"
                          }
                        >
                          <a>
                            <span>click for more details</span>
                          </a>
                        </Link>
                      </div>
                      <div className="align-self-center">
                        <h6>
                          {dataShipment.data?.filter(
                            (item) => item.AssignedShipment === true
                          ).length || 0}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body cleartfix">
                    <div className="media align-items-stretch">
                      <div className="align-self-center">
                        <i className="first fas fa-truck font-large-2 mr-2"></i>
                      </div>
                      <div className="media-body">
                        <h6>Total Shipment Delivered </h6>
                        <Link
                          href={
                            user.roles === "shipper"
                              ? "/shipment/?userId=" + user.UserId
                              : user.roles === "carrier"
                              ? "/shipment/?companyId=" + user.CompanyId
                              : "/shipment/"
                          }
                        >
                          <a>
                            <span>click for more details</span>
                          </a>
                        </Link>
                      </div>
                      <div className="align-self-center">
                        <h6>
                          {dataShipment.data?.filter(
                            (item) => item.ShipmentStatus === "Delivered"
                          ).length || 0}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default NewsFlash;
