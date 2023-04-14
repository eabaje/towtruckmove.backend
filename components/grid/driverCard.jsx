import { Country, State } from "country-state-city";
import React from "react";
import { Link } from "react-router-dom";
import { IMG_URL } from "../../constants";
import Rating from "../rating/Rating";

const DriverCard = ({ props }) => {
  const { driver } = props;
  const calculate_age = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return (
    <>
      <div className="card p-3 py-6">
        <div className="text-center">
          {" "}
          <img
            src={
              driver.PicUrl
                ? IMG_URL + driver?.PicUrl
                : "https://bootdey.com/img/Content/avatar/avatar7.png"
            }
            width="100"
            className="rounded-circle"
          />{" "}
        </div>
        <div className="text-center mt-3">
          {" "}
          <span className="bg-secondary p-1 px-4 rounded text-white">
            {driver?.DriverName}
          </span>
          <h6 className="mt-2 mb-0">{driver.Company?.CompanyName}</h6>{" "}
          <span>
            <i className="fa fa-phone-square" aria-hidden="true"></i>{" "}
            {driver?.Phone}
          </span>
          <div className="row about-list ">
            <div className="col-md-12">
              <div className="media">
                <label>Age(yrs)</label>
                <p>{getAge(driver?.DOB)}</p>
              </div>
              <div className="media">
                <label>City</label>
                <p>{driver?.City}</p>
              </div>
              <div className="media">
                <label>Country</label>
                <p>
                  {" "}
                  {driver?.Country
                    ? Country.getCountryByCode(driver?.Country).name
                    : driver?.Country}
                </p>
              </div>
              <Rating
                rating={driver?.Rating ? driver?.Rating : 1}
                caption=" "
              ></Rating>
            </div>
          </div>
          <div className="px-4 mt-1">
            <p className="fonts"> </p>
          </div>
          <ul className="social-list">
            <li>
              <i className="fa fa-facebook"></i>
            </li>
            <li>
              <i className="fa fa-dribbble"></i>
            </li>
            <li>
              <i className="fa fa-instagram"></i>
            </li>
            <li>
              <i className="fa fa-linkedin"></i>
            </li>
            <li>
              <i className="fa fa-google"></i>
            </li>
          </ul>
          <div className="buttons">
            {" "}
            <Link
              href={`driver-detail/?driverId=${driver.DriverId}&vehicleId=${driver.Vehicles[0]["VehicleId"]}`}
            >
              <a className="btn btn-outline-primary px-4">
                {" "}
                <i className="feather icon-log-out"></i> Check It Out
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverCard;
