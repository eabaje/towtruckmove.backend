import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Country, State } from "country-state-city";
import { GlobalContext } from "../../../context/Provider";
import {
  createDriver,
  editDriver,
} from "../../../context/actions/driver/driver.action";
import ImageUpload from "../../../components/upload/uploadImage";
//import "bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomButton from "../../../components/button/customButton";
import { fetchData } from "../../../helpers/query";
import { IMG_URL } from "../../../constants";
import CustomPopup from "../../../components/popup/popup.component";
import Pdfviewer from "../../../components/pdf/pdfviewer";
import UpdateFileUpload from "../../../components/upload/edit-file-upload";
import { toast } from "react-toastify";
import UploadWidget from "../../upload/upload-widget";
import {
  PopUpClose,
  PopUpOpen,
} from "../../../context/actions/user/user.action";
//import PDFViewer from "../../pdf/pdf-viewer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { DOC_TYPE } from "../../../constants/enum";

const AddEditDriver = ({ query }) => {
  const PDFViewer = dynamic(
    () => import("../../../components/pdf/pdf-viewer"),
    {
      ssr: false,
    }
  );
  const router = useRouter();
  const { driverId, readOnly } = query;
  const isAddMode = !driverId;
  let imgPath = "";

  //*************STATE VARIABLES ************* */
  const [IsEdit, setEdit] = useState(false);
  const [country, setCountry] = useState("");
  const [companyId, setcompanyId] = useState("");
  const [email, setEmail] = useState("");
  const [countries, setCountries] = useState([]);
  const [pickUpRegion, setPickUpRegion] = useState([]);
  const [picFile, setpicFile] = useState(null);
  const [docFile, setdocFile] = useState(null);
  const [docsFile, setdocsFile] = useState([]);
  const [docUrl, setdocUrl] = useState(null);
  const [doc, setdoc] = useState(null);
  const [url, setUrl] = useState(null);
  const [selPickUpRegion, setselpickUpRegion] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [visibilityImage, setVisibilityImage] = useState(open);
  const [visibilityFile, setVisibilityFile] = useState(open);

  const [rowsData, setRowsData] = useState([]);

  //********************CONTEXT FUNCTIONS ***************** */

  const {
    authState: { user },
    userDispatch,
    driverDispatch,
    userState: {
      popUpOverLay: { open },
    },
    driverState: {
      createDriver: { error, loading },
    },
  } = useContext(GlobalContext);

  //**************** PAGE Functions ***************** */

  const addTableRows = () => {
    const rowsInput = {
      DocName: "",
      DocTitle: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const popupCloseHandler = (e) => {
    PopUpClose()(userDispatch);
    setVisibility(e);
  };
  const popupCloseHandlerImage = () => {
    PopUpClose()(userDispatch);
    setVisibilityImage(false);
  };

  const popupCloseHandlerFile = (e) => {
    PopUpClose()(userDispatch);
    setVisibilityFile(e);
  };

  const selectPickUpCountry = async (e) => {
    setCountry((country) => e.target.value);

    setPickUpRegion(
      (pickUpRegion) =>
        // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
        (pickUpRegion = State.getStatesOfCountry(e.target.value))
    );
  };

  const onChangePicHandler = async (e) => {
    setpicFile((picFile) => e.target.files[0]);
  };
  console.log(`picFile`, picFile);

  const onChangeDocHandler = async (e) => {
    setdocFile((docFile) => e.target.files[0]);
  };

  const onChangeDocsHandler = async (e) => {
    setdocsFile((docsFile) => [...docsFile, e.target.files[0]]);
  };
  console.log(`docFile`, docsFile);

  const PopFuncVisibilityImage = () => {
    PopUpOpen()(userDispatch);
    // e(open);
    setVisibilityImage(open);
  };

  const PopFuncVisibilityFile = () => {
    PopUpOpen()(userDispatch);
    setVisibilityFile(open);

    // e(open);
  };

  const loadData = async (driverId) => {
    fetchData(
      "driver/findOne",
      driverId
    )((driver) => {
      console.log(`driver`, IMG_URL + driver["PicUrl"]);
      setUrl(driver["PicUrl"]);
      imgPath = driver["PicUrl"];
      //  alert(imgPath)
      const fields = [
        "DriverName",
        "Email",
        "DOB",
        "Address",
        "City",
        "Country",
        "Phone",
        "PicUrl",
        "Licensed",
        "LicenseUrl",
        "DriverDocs",
      ];
      fields.forEach((field) => setValue(field, driver[field]));
      //  setImgUrl(driver["PicUrl"]);
      setEmail(driver["Email"]);
      setcompanyId(driver["CompanyId"]);
      setdocUrl(IMG_URL + driver.DriverDocs);

      const splitdoc = driver?.DriverDocs ? driver.DriverDocs.split("/") : null;
      if (splitdoc !== null) {
        setdoc(splitdoc[2]);
      }
      setPickUpRegion(
        (pickUpRegion) =>
          // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
          (pickUpRegion = State.getStatesOfCountry(driver["Country"]))
      );

      setselpickUpRegion(driver["Region"]);
    })((err) => {
      toast.error(err.message);
    });
  };
  //***************END FUNCTIONS *********************** */

  // *****************************USE EFFECT *****************

  useEffect(() => {
    //   addTableRows();
    setCountries((countries) => (countries = Country.getAllCountries()));
    let interval;

    if (!isAddMode) {
      open === false ? loadData(driverId) : loadData(driverId);
    }
    //  console.log(`docUrl`, docUrl);
  }, [open]);

  //**************************FORM FUNCTIONS ************* */

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm();

  function onSubmit(formdata) {
    // console.log(`formdata`, formdata);
    return isAddMode
      ? CreateDriver(formdata)
      : UpdateDriver(formdata, driverId);
  }

  const CreateDriver = (data) => {
    data.CompanyId = user.CompanyId;

    console.log(`form`, data);
    createDriver(data, picFile, docFile)(driverDispatch)((res) => {
      if (res) {
        toast.success(`Created New Driver-${res.data.DriverName} successfully`);
        setTimeout(() => {
          toast.dismiss();
          router.reload(`/driver/?companyId=${user.CompanyId}`);
        }, 5000);
      }
    })((error) => {
      toast.error(error.message);
    });
  };

  const UpdateDriver = (data, driverId) => {
    data.CompanyId = user.CompanyId;

    editDriver(data, driverId)(driverDispatch)((res) => {
      console.log(`res`, res);
      if (res) {
        toast.success(`${res.message}`);
      }
    })((error) => {
      toast.error(error.message);
    });
  };

  // *************************END FORM FUNCTIONS***********************

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => {
    return (
      <div className="input-group mb-3">
        <input
          ref={ref}
          type="text"
          className="form-control datepicker"
          value={value}
          onClick={onClick}
          placeholder="Click to enter date"
          required
        />
        <div className="input-group-append">
          <span className="input-group-text">
            <i className="fa fa-calendar"></i>
          </span>
        </div>
      </div>
    );
  });
  CustomInput.displayName = "CustomInput";
  console.log("docFile", docFile);
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-header alert alert-info">
          <h2>Driver Information Collection Form</h2>
        </div>
        <div className="card-body">
          <div className="col-md-12 ">
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="hidden"
                name="UserId"
                value={user.UserId}
                className="form-control"
              />
              <input
                type="hidden"
                name="CompanyId"
                value={user.CompanyId}
                className="form-control"
                {...register("CompanyId")}
              />
              <input
                type="hidden"
                name="PicUrl"
                className="form-control"
                {...register("PicUrl")}
              />
              <input
                type="hidden"
                name="LicenseUrl"
                className="form-control"
                {...register("LicenseUrl")}
              />
              <div className="form-group row">
                <div className="col-md-12 ">
                  <span>
                    {" "}
                    <ImageUpload
                      refId={driverId}
                      show={driverId ? false : true}
                      reload={!open}
                      url="/driver/findOne/"
                      fieldName="PicUrl"
                      onChangePicHandler={onChangePicHandler}
                    />
                    {readOnly === "true" ? (
                      <></>
                    ) : (
                      driverId && (
                        <a href="#" onClick={PopFuncVisibilityImage}>
                          <i
                            className="first fas fa-pen"
                            title="Update your picture"
                          ></i>
                        </a>
                      )
                    )}
                  </span>

                  {visibilityImage && (
                    <CustomPopup onClose={popupCloseHandlerImage} show={open}>
                      <UploadWidget
                        refId={driverId}
                        defaultTbl="/driver/updateDriverPic"
                        title={"Upload Images"}
                        fileType="image"
                        isAddImage={false}
                        uploadUrl={`${companyId}/${email}`}

                        //  closePoPUp={closePoPUp}
                      />
                    </CustomPopup>
                  )}
                </div>
                <div className="col-md-2">
                  <span> </span>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <h5 className="alert alert-info"> </h5>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Company Name</label>

                <div className="col-sm-4">
                  <input
                    name="CompanyName"
                    className="form-control"
                    readOnly="readonly"
                    value={user.CompanyName}
                    placeholder="Company Name"
                    {...register("CompanyName")}
                  />
                </div>
                <label className="col-sm-2 col-form-label">Driver Name</label>

                <div className="col-sm-4">
                  <input
                    name="DriverName"
                    className="form-control"
                    placeholder="Driver Name"
                    {...register("DriverName", {
                      required: true,
                    })}
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-4">
                  <input
                    name="Email"
                    className="form-control"
                    placeholder="Email"
                    {...register("Email", {
                      required: true,
                    })}
                    required
                  />
                </div>

                <label className="col-sm-2 col-form-label">Phone</label>
                <div className="col-sm-4">
                  <input
                    name="Phone"
                    className="form-control"
                    placeholder="Phone"
                    {...register("Phone", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">DOB</label>
                <div className="col-sm-4">
                  <Controller
                    name={"DOB"}
                    control={control}
                    // defaultValue={new Date()}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <DatePicker
                          wrapperclassName="datePicker"
                          className="form-control datepicker"
                          onChange={onChange}
                          selected={Date.parse(value)}
                          yearDropdownItemNumber={100}
                          // dateFormat="dd-MM-yyyy"
                          scrollableYearDropdown={true}
                          showYearDropdown
                          showMonthDropdown
                          placeholderText="Enter date"
                          customInput={<CustomInput />}
                        />
                      );
                    }}
                  />
                </div>

                <label className="col-sm-2 col-form-label">City</label>
                <div className="col-sm-4">
                  <input
                    name="Phone"
                    className="form-control"
                    placeholder="City"
                    {...register("City")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label col-md-2">Country</label>
                <div className="col-md-4">
                  <select
                    name="Country"
                    className="form-control"
                    {...register("Country")}
                    onChange={selectPickUpCountry}
                  >
                    <option value="">Select Country</option>
                    {countries.map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="col-form-label col-md-2">Region/State</label>
                <div className="col-md-4">
                  <select
                    name="Region"
                    className="form-control"
                    id="Region"
                    {...register("Region", {
                      required: true,
                    })}
                  >
                    <option value=""> Select Region/State </option>
                    {pickUpRegion.map((item) => (
                      <option
                        key={item.isoCode}
                        selected={selPickUpRegion === item.isoCode}
                        value={item.isoCode}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-form-label col-md-2">Address</label>
                <div className="col-md-10">
                  <input
                    name="Address"
                    className="form-control"
                    placeholder="Address"
                    {...register("Address", {
                      required: true,
                    })}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2"> Drivers License?</div>

                <div className="col-md-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="Licensed"
                      type="checkbox"
                      {...register("Licensed", {
                        required: true,
                      })}
                      required
                    />
                  </div>
                </div>

                {driverId ? (
                  <div className="col-md-6 ">
                    {docUrl && (
                      <a href="#" onClick={(e) => setVisibility(!visibility)}>
                        {doc}{" "}
                        <i
                          className="first fas fa-download"
                          title="View PDF File"
                        ></i>
                      </a>
                    )}

                    {visibility && (
                      <CustomPopup
                        onClose={popupCloseHandler}
                        show={visibility}
                      >
                        <PDFViewer pdfLink={docUrl} />
                      </CustomPopup>
                    )}
                    {readOnly === "true" ? (
                      <></>
                    ) : (
                      <a href="#" onClick={PopFuncVisibilityFile}>
                        <i
                          className="first fas fa-pen"
                          title="Upload PDF File"
                        ></i>
                      </a>
                    )}
                    {visibilityFile && (
                      <CustomPopup onClose={popupCloseHandler} show={open}>
                        <UploadWidget
                          refId={driverId}
                          defaultTbl="/driver/updateFile"
                          title={"Upload  Document(s)"}
                          fileType="file"
                          isAddImage={false}
                          uploadUrl={`${companyId}/${email}`}
                          //  closePoPUp={closePoPUp}
                        />
                      </CustomPopup>
                    )}
                  </div>
                ) : (
                  <>
                    {" "}
                    <label className="col-form-label col-md-2">
                      Attach Drivers License
                    </label>
                    <div className="col-md-4">
                      <input
                        className="form-control"
                        type="file"
                        id="fileLicenseUrl"
                        name="fileLicenseUrl"
                        {...register("fileLicenseUrl")}
                        onChange={(e) => onChangeDocHandler(e)}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* <div className="form-group row">
                <div className="col-md-12 alert alert-info">
                  <h6>
                    {" "}
                    User document List
                    <button
                      type="button"
                      className=" btn-outline-primary right"
                      onClick={addTableRows}
                    >
                      + Add Document
                    </button>
                  </h6>
                </div>
                <div className="col-md-12 ">
                  {rowsData.map((document, index) => (
                    <>
                      <div id={index}>
                        <div className="form-group row">
                          <div className="col-sm-4">
                            <select
                              required="required"
                              className="form-control"
                              name={`document[${index}].DocType`}
                              id={`document[${index}].DocType`}
                              {...register(`document[${index}].DocType`)}
                            >
                              <option value="">Choose Document Type</option>
                              {DOC_TYPE.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.text}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-4">
                            <input
                              name={`document[${index}].DocTitle`}
                              className="form-control"
                              placeholder="Document Title"
                              {...register(`document[${index}].DocTitle`, {
                                required: true,
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <input
                              className="form-control"
                              type="file"
                              id={`document[${index}].DocName`}
                              name={`document[${index}].DocName`}
                              {...register(`document[${index}].DocName`)}
                              onChange={(e) => onChangeDocsHandler(e)}
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <div className="col-md-12 alert alert-info">
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn btn-outline-danger right"
                                onClick={() => deleteTableRows(index)}
                              >
                                x
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div> */}
              {readOnly !== "true" && (
                <>
                  <div className="form-group row alert alert-info">
                    <div className="col-md-8 "></div>
                    <div className="col-md-4 "></div>
                  </div>
                  <div className="form-group"></div>

                  <div className="form-row">
                    <div className="col-sm-10 ">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="invalidCheck"
                        >
                          I confirm all information entered are accurate
                        </label>
                        <div className="invalid-feedback">
                          You must agree before submitting.
                        </div>
                      </div>
                    </div>
                    <div className="right" style={{ float: "right" }}>
                      <CustomButton loading={loading} isAddMode={isAddMode} />
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditDriver;
