import React, { useState, useContext, useEffect } from "react";
import { IMG_URL, MEDIA_URL } from "../../../constants";
import { useForm, Controller } from "react-hook-form";

import { Country, State } from "country-state-city";

import { fetchData } from "../../../helpers/query";

import { GlobalContext } from "../../../context/Provider";
import {
  editUser,
  resetPassword,
  updateCompany,
} from "../../../context/actions/user/user.action";

import ImageUpload from "../../../components/upload/uploadImage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomButton from "../../../components/button/customButton";
import { SPECIALIZATION_TYPE } from "../../../constants/enum";
import CustomPopup from "../../../components/popup/popup.component";

import { toast } from "react-toastify";

import Pdfviewer from "../../pdf/pdfviewer";
import { getFiles } from "../../../helpers/uploadImage";
import Datatable from "../../datatable/datatable-m";
import { listVehiclesByCompany } from "../../../context/actions/vehicle/vehicle.action";
import { columns } from "../../../datasource/dataColumns/vehicle-read";
import { columns as columnsDriver } from "../../../datasource/dataColumns/driver-read";
import { listDriversByCompany } from "../../../context/actions/driver/driver.action";

const ReviewCompany = ({ query }) => {
  const { companyId, readOnly } = query;

  const isSingleMode = !companyId;

  const [profile, setProfile] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  const isAddMode = !companyId;

  const [imageInfos, setImageInfos] = useState([]);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [pickUpRegion, setPickUpRegion] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [selPickUpRegion, setselpickUpRegion] = useState("");
  const [value, setValues] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [visibilityImage, setVisibilityImage] = useState(false);
  function onChange(event) {
    setValues(event.target.value);
    // state.companyUser.Specilaization =
    //   event.target.options[event.target.selectedIndex].text;
    // console.log(
    //   "value:",
    //   event.target.options[event.target.selectedIndex].text
    //);
  }
  const popupCloseHandler = (e) => {
    //  PopUpClose()(userDispatch);
    setVisibility(e);
  };
  // Messages
  const required = "This field is required";
  const maxLength = "Your input exceed maximum length";

  // Error Component
  const errorMessage = (error) => {
    return (
      <p className="invalid-feedback" style={{ color: "red" }}>
        {error}
      </p>
    );
  };

  const selectCountry = async (e) => {
    setCountry((country) => e.target.value);

    setRegion(
      (region) =>
        // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
        (region = State.getStatesOfCountry(e.target.value))
    );
  };

  const selectPickUpCountry = async (e) => {
    setCountry((country) => e.target.value);

    setPickUpRegion(
      (pickUpRegion) =>
        // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
        (pickUpRegion = State.getStatesOfCountry(e.target.value))
    );
  };
  const popupCloseHandlerImage = (e) => {
    setVisibilityImage(e);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue: setValue2,
    control,
  } = useForm();

  const {
    authState: { user },
    vehicleDispatch,
    vehicleState: {
      Vehicles: { data: vehicleData, loading },
    },
    driverDispatch,
    driverState: {
      Drivers: { data: driverData, loading: loadDriver },
    },
  } = useContext(GlobalContext);

  const getCompany = (companyId) => {
    fetchData(
      "user/findCompany",
      companyId
    )((company) => {
      console.log("company", company);
      setCompanyInfo(company);
      const fields2 = [
        "CompanyName",
        "ContactEmail",
        "ContactPhone",
        "Address",
        "Region",
        "Country",
        "CompanyType",
        "Specialization",
        "RoleType",
        "Website",
        "IsVetted",
      ];
      fields2.forEach((field2) => setValue2(field2, company[field2]));
    })((err) => {
      toast.error(err);
    });
  };

  useEffect(() => {
    getCompany(companyId);
    if (companyId) {
      listVehiclesByCompany(companyId)(vehicleDispatch)((res) => {})((err) => {
        toast.error(err);
      });

      listDriversByCompany(companyId)(driverDispatch)((res) => {})((err) => {
        toast.error(err);
      });
    }

    // setCountries((countries) => (countries = Country.getAllCountries()));
    fetchData(
      "carrier/findOne",
      companyId
    )((user) => {
      setProfile(user);
      getCompany(companyId);
      const fields = [
        "FullName",
        "Email",
        "DOB",
        "Address",
        "City",
        "Country",
        "Phone",
        "PicUrl",
      ];
      fields.forEach((field) => setValue(field, user[field]));
      setEmail(user["Email"]);
      // setcompanyId(user["CompanyId"]);
      // setPickUpRegion(
      //   (pickUpRegion) =>
      //     // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
      //     (pickUpRegion = State.getStatesOfCountry(user["Country"]))
      // );

      // setselpickUpRegion(user["Region"]);
    })((err) => {
      toast.error(err);
    });
  }, []);

  useEffect(() => {
    if (companyId !== undefined) {
      getFiles(companyId, "pdf").then((files) => {
        const doc = files.data.data;

        setImageInfos(doc);
        console.log("GetFiles", doc);
      });
    }
  }, []);
  function SubmitForm(formdata) {
    console.log("formdata", formdata);
    return Vet(formdata);
  }
  function Vet(formdata) {
    //  console.log(`formdata`, formdata);
    updateCompany(formdata)(userDispatch)((res) => {
      if (res) {
        toast.success("Company is vetted successfully");
      }

      //Route to Upload Pictures for vehicle
    })((err) => {
      toast.error(err);
    });
  }

  console.log("VehicleData", vehicleData);
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header alert alert-info">
          <h3>Review Company Info</h3>
          <hr />
          <ul>
            <li>Review Registrant Info</li>
            <li>Approve /Activate User</li>
          </ul>
        </div>
        <div className="card-body table-border-style">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="accordion" id="accordionExample">
                  <div className="card ">
                    <div
                      className="card-header alert alert-info"
                      id="headingOne"
                    >
                      <h5 className="mb-0 ">
                        <a
                          href="#!"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Basic Company Info
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <form>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Company Name
                            </label>

                            <div className="col-sm-4">
                              <label className=" col-form-label">
                                {companyInfo.CompanyName}
                              </label>
                            </div>
                            <label className="col-sm-2 col-form-label">
                              Industry
                            </label>

                            <div className="col-sm-4">
                              <label className=" col-form-label">
                                {companyInfo?.Specialization
                                  ? SPECIALIZATION_TYPE.find(
                                      (item) =>
                                        item.value ===
                                        companyInfo?.Specialization
                                    ).text
                                  : companyInfo?.Specialization}
                              </label>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Company Email
                            </label>

                            <div className="col-sm-4">
                              <label className=" col-form-label">
                                {companyInfo.ContactEmail}
                              </label>
                            </div>
                            <label className="col-sm-2 col-form-label">
                              Company Phone
                            </label>

                            <div className="col-sm-4">
                              <label className=" col-form-label">
                                {companyInfo.ContactPhone}
                              </label>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Region
                            </label>

                            <div className="col-sm-4">
                              <label className=" col-form-label">
                                {companyInfo?.Region
                                  ? State.getStateByCodeAndCountry(
                                      companyInfo?.Region,
                                      companyInfo?.Country
                                    ).name
                                  : companyInfo?.Region}
                              </label>
                            </div>
                            <label className="col-sm-2 col-form-label">
                              Country
                            </label>

                            <div className="col-sm-4">
                              <label className=" col-form-label">
                                {companyInfo.Country
                                  ? Country.getCountryByCode(
                                      companyInfo.Country
                                    ).name
                                  : companyInfo.Country}
                              </label>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Company Address
                            </label>

                            <div className="col-sm-10">
                              <label className=" col-form-label">
                                {companyInfo.ContactAddress}
                              </label>
                            </div>
                          </div>

                          <div className="form-group"></div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header alert-info" id="headingTwo">
                      <h5 className="mb-0 ">
                        <a
                          href="#!"
                          className="collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Company Document
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <div className="col-md-12">
                          {imageInfos.length > 0 && (
                            <>
                              <ul className="list-group list-group-flush">
                                {imageInfos.map((img, index) => (
                                  <li className="list-group-item" key={index}>
                                    {visibility && (
                                      <CustomPopup
                                        onClose={popupCloseHandler}
                                        show={visibility}
                                      >
                                        <Pdfviewer
                                          pdfLink={MEDIA_URL + img.ImgPath}
                                        />
                                      </CustomPopup>
                                    )}
                                    <a
                                      href="#"
                                      onClick={(e) =>
                                        setVisibility(!visibility)
                                      }
                                    >
                                      <i
                                        className="first fas fa-download"
                                        title="View PDF File"
                                        aria-hidden="true"
                                        style={{ cursor: "hand" }}
                                      ></i>
                                      {img.FileName}{" "}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header alert-info" id="headingThree">
                      <h5 className="mb-0 ">
                        <a
                          href="#!"
                          className="collapsed"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Fleet Info
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      aria-labelledby="headingThree"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <div className="col-md-12">
                          <h6>
                            {" "}
                            Total No of Vehicles:&nbsp;
                            {vehicleData?.data?.length}{" "}
                          </h6>
                          {vehicleData?.data?.length > 0 && (
                            <>
                              {vehicleData?.data ? (
                                <div className="card-body table-border-style">
                                  <Datatable
                                    loading={loading}
                                    col={columns(user)}
                                    data={vehicleData?.data}
                                  />
                                </div>
                              ) : (
                                <h6> No Fleet info available </h6>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header alert-info" id="headingFour">
                      <h5 className="mb-0 ">
                        <a
                          href="#!"
                          className="collapsed"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          Driver Info
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseFour"
                      className="collapse"
                      aria-labelledby="headingFour"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <div className="col-md-12">
                          <h6>
                            {" "}
                            Total No of Drivers:&nbsp;{
                              driverData?.data?.length
                            }{" "}
                          </h6>
                          {driverData?.data?.length > 0 && (
                            <>
                              {driverData?.data ? (
                                <div className="card-body table-border-style">
                                  <Datatable
                                    loading={loadDriver}
                                    col={columnsDriver(user)}
                                    data={driverData?.data}
                                  />
                                </div>
                              ) : (
                                <h6> No Driver info available </h6>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {readOnly !== "true" && (
                  <form onSubmit={handleSubmit(SubmitForm)}>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">
                        Check to Vet
                      </label>
                      <div className="col-sm-2">
                        <input
                          type="checkbox"
                          name="IsVetted"
                          className="form-check-input-custom-2"
                          {...register("IsVetted", {
                            required: true,
                          })}
                        />
                      </div>

                      <div className="col-sm-6" style={{ float: "right" }}>
                        <input
                          type="hidden"
                          name="CompanyId"
                          value={companyId}
                          className="form-control"
                          {...register("CompanyId")}
                        />

                        <CustomButton
                          caption={"Vett It"}
                          loading={loading}
                          isAddMode={isAddMode}
                        />
                      </div>
                    </div>
                    <div className="right" style={{ float: "right" }}></div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//Login.layout = "main";

export default ReviewCompany;

//export default dynamic(() => Promise.resolve(ReviewCompany), { ssr: true });
