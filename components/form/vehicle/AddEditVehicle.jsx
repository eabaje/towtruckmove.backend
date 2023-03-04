import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Country, State } from "country-state-city";
import { GlobalContext } from "../../../context/Provider";
import { LOAD_TYPE, LOAD_CAPACITY, LOAD_UNIT } from "../../../constants/enum";
import {
  createVehicle,
  editVehicle,
} from "../../../context/actions/vehicle/vehicle.action";
import { fetchData, fetchDataAll } from "../../../helpers/query";
import {
  assignDriverToVehicle,
  listDriversByCompany,
} from "../../../context/actions/driver/driver.action";
import UploadImages from "../../../components/upload/image-upload";

import { toast } from "react-toastify";
import DocumentUpload from "../../upload/doc-file-upload";

const AddEditVehicle = ({ query }) => {
  const { vehicleId, companyId, carrierId, carrierType, driverId, readOnly } =
    query;

  const isAddMode = !vehicleId;
  const [formStep, setFormStep] = useState(0);
  const [refId, setRefId] = useState("");

  // const onSubmit = (data) => console.log(data);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    authState: { user },
  } = useContext(GlobalContext);

  const {
    vehicleDispatch,
    vehicleState: {
      createVehicle: { loading },
    },
  } = useContext(GlobalContext);

  const {
    driverDispatch,
    driverState: {
      Drivers: { data: driverdata, error },
      createDriver: { data: assigndata, error: assignerror },
    },
  } = useContext(GlobalContext);

  function SubmitForm(formdata) {
    console.log("formdata", formdata);
    return isAddMode
      ? CreateVehicle(formdata)
      : driverId
      ? AssignDriverToVehicle(formdata, vehicleId)
      : EditVehicle(formdata, vehicleId);
  }

  function CreateVehicle(formdata) {
    //  console.log(`formdata`, formdata);
    createVehicle(formdata)(vehicleDispatch)((res) => {
      toast.success(res.message);
      setRefId(res.data.VehicleId);
      setFormStep(1);
      //Route to Upload Pictures for vehicle
    })((err) => {
      toast.error(err);
    });
  }
  const SetFormStep = () => {
    setFormStep(0);
    // (step) ? setFormStep(step) : setFormStep(0);
  };

  function EditVehicle(data, id) {
    setRefId(id);
    editVehicle(data, id)(vehicleDispatch)((res) => {
      toast.success(res.message);
    })((err) => {
      toast.error(err);
    });
  }

  function AssignDriverToVehicle(data, id) {
    setRefId(id);
    assignDriverToVehicle(data, id)(driverDispatch)((res) => {
      toast.success(res.message);
    })((err) => {
      toast.error(err);
      //  enqueueSnackbar(err, { variant: "error" });
    });
  }

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (driverdata.length === 0) {
      if (driverId) {
        listDriversByCompany(companyId)(driverDispatch)((res) => {})((err) => {
          toast.error(err);
        });
      }
    }

    if (!isAddMode) {
      fetchData(
        "vehicle/findOne",
        vehicleId
      )((res) => {
        const fields = [
          "VehicleType",
          "VehicleId",
          "VehicleNumber",
          "SerialNumber",
          "VehicleMake",
          "Description",
          "VehicleColor",
          "VehicleModel",
          "SerialNumber",
          "LicensePlate",
          "Insured",
          "VehicleModelYear",
          "PurchaseYear",
          "CompanyId",
          "CarrierId",
        ];
        fields.forEach((field) => setValue(field, res[field]));
        setRefId(vehicleId);
      })((err) => {
        toast.error(err);
      });
    }
  }, []);
  console.log("formStep", formStep);
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-header alert alert-info">
          <h2 className="alert alert-info">Vehicle Information</h2>
        </div>
        <div className="card-body">
          <div className="col-md-12 ">
            {formStep === 0 && (
              <form onSubmit={handleSubmit(SubmitForm)}>
                <input
                  type="hidden"
                  name="UserId"
                  value={user.UserId}
                  className="form-control"
                  {...register("UserId")}
                />
                <input
                  type="hidden"
                  name="CompanyId"
                  value={companyId}
                  className="form-control"
                  {...register("CompanyId")}
                />
                <input
                  type="hidden"
                  name="CarrierId"
                  value={carrierId}
                  className="form-control"
                  {...register("CarrierId")}
                />
                {vehicleId && (
                  <input
                    type="hidden"
                    name="VehicleId"
                    value={vehicleId}
                    className="form-control"
                    {...register("VehicleId")}
                  />
                )}

                {driverId && (
                  <>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <h5 className="alert alert-info">
                          Assign Vehicle to Driver{" "}
                        </h5>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">
                        Driver To Assign
                      </label>
                      <div className="col-md-4">
                        <select
                          id="DriverId"
                          className="form-control"
                          readOnly={readOnly}
                          {...register("DriverId", {
                            required: true,
                          })}
                        >
                          <option selected>Select Driver</option>
                          {driverdata?.data?.map((item) => (
                            <option key={item.DriverId} value={item.DriverId}>
                              {item.DriverName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label className="col-sm-2 col-form-label">
                        Vehicle License Number(VIN)
                      </label>
                      <div className="col-sm-4">
                        <input
                          name="VehicleNumber"
                          id="VehicleNumber"
                          className="form-control"
                          readOnly={readOnly}
                          placeholder="Vehicle Number"
                          {...register("VehicleNumber", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="form-group row">
                  <div className="col-md-12">
                    <h5 className="alert alert-info"> Vehicle Info </h5>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    Vehicle Type
                  </label>
                  <div className="col-md-4">
                    <select
                      id="VehicleType"
                      className="form-control"
                      readOnly={readOnly}
                      {...register("VehicleType", {
                        required: true,
                      })}
                    >
                      <option selected>Select Vehicle Type</option>
                      {LOAD_TYPE.map((item) => (
                        <option
                          key={item.value}
                          selected={carrierType === item.value}
                          value={item.value}
                        >
                          {item.text}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label className="col-sm-2 col-form-label">
                    VIN / CHASIS NUMBER
                  </label>
                  <div className="col-sm-4">
                    <input
                      name="VehicleNumber"
                      className="form-control"
                      readOnly={readOnly}
                      placeholder="Vehicle Number"
                      {...register("VehicleNumber", {
                        required: true,
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/* <label className="col-sm-2 col-form-label">
                    Serial Number
                  </label>

                  <div className="col-sm-4">
                    <input
                      name="SerialNumber"
                      className="form-control"
                      placeholder="Serial Number"
                      readOnly={readOnly}
                      {...register("SerialNumber", {
                        required: true,
                      })}
                    />
                  </div> */}
                  <label className="col-sm-2 col-form-label">
                    Vehicle Make
                  </label>
                  <div className="col-sm-4">
                    <input
                      name="VehicleMake"
                      className="form-control"
                      readOnly={readOnly}
                      placeholder="Vehicle Make"
                      {...register("VehicleMake", {
                        required: true,
                      })}
                    />
                  </div>

                  <label className="col-form-label col-md-2">
                    Vehicle Model
                  </label>
                  <div className="col-md-4">
                    <input
                      name="VehicleModel"
                      className="form-control"
                      readOnly={readOnly}
                      placeholder="Vehicle Model"
                      {...register("VehicleModel", {
                        required: true,
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-form-label col-md-2">
                    Vehicle Color
                  </label>

                  <div className="col-md-4">
                    <input
                      name="VehicleColor"
                      className="form-control"
                      readOnly={readOnly}
                      placeholder="Vehicle Color"
                      {...register("VehicleColor", {
                        required: true,
                      })}
                      required
                    />
                  </div>

                  <label className="col-form-label col-md-2">
                    Vehicle Model Year
                  </label>

                  <div className="col-md-4">
                    <input
                      name="VehicleModelYear"
                      placeholder="Vehicle Model Year"
                      className="form-control"
                      readOnly={readOnly}
                      {...register("VehicleModelYear", {
                        required: true,
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <h5 className="alert alert-info"> Vehicle Information </h5>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-form-label col-md-2">
                    Vehicle License Plate
                  </label>

                  <div className="col-md-4">
                    <input
                      name="LicensePlate"
                      className="form-control"
                      readOnly={readOnly}
                      placeholder="License Plate"
                      {...register("LicensePlate", {
                        required: true,
                      })}
                    />
                  </div>

                  <label className="col-form-label col-md-2">
                    Purchase Year
                  </label>

                  <div className="col-md-4">
                    <input
                      name="PurchaseYear"
                      className="form-control"
                      readOnly={readOnly}
                      placeholder=" Enter Purchase year"
                      {...register("PurchaseYear")}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Insured?</label>
                  <div className="col-sm-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="Insured"
                        readOnly={readOnly}
                        className="form-check-input-custom-2"
                        {...register("Insured", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>

                  <label className="col-form-label col-md-2">Description</label>
                  <div className="col-md-4">
                    <input
                      name="Description"
                      className="form-control"
                      readOnly={readOnly}
                      placeholder="Description"
                      {...register("Description")}
                    />
                  </div>
                </div>

                <div className="form-group row"></div>

                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group has-feedback">
                      <label for="vehicleAdditionalInfo0"></label>
                      <textarea
                        rows="4"
                        maxlength="400"
                        id="Description"
                        name="Description"
                        class="form-control"
                        placeholder="Additional Vehicle Information"
                        readOnly={readOnly}
                      />
                      <span
                        class="glyphicon form-control-feedback"
                        aria-hidden="true"
                      ></span>
                      <span class="help-block with-errors text-right small"></span>
                    </div>
                  </div>
                </div>

                {readOnly === "true" ? (
                  <></>
                ) : (
                  <>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <h5 className="alert alert-info"></h5>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-sm-10 ">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="IsValid"
                            value=""
                            id="invalidCheck"
                            required
                          />
                          <label className="form-check-label">
                            I confirm all information entered are accurate
                          </label>
                          <div className="invalid-feedback">
                            You must agree before submitting.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-6 "></div>
                      <div className="col-md-4 ">
                        <span>
                          {!isAddMode && formStep === 0 && (
                            <button
                              type="button"
                              className="btn  btn-primary"
                              onClick={() => setFormStep(1)}
                              style={{ right: "150px" }}
                            >
                              <i className="feather mr-2 icon-check-circle"></i>{" "}
                              {"Upload Picture "}
                            </button>
                          )}
                        </span>
                        <span>
                          <button
                            type="submit"
                            className="btn  btn-primary"
                            style={{ float: "right" }}
                          >
                            {loading ? (
                              <i classNameName="fa fa-spinner fa-spin"></i>
                            ) : (
                              <i className="feather mr-2 icon-check-circle"></i>
                            )}{" "}
                            {isAddMode
                              ? "Submit"
                              : driverId
                              ? "Assign Driver"
                              : "Update"}
                          </button>
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </form>
            )}
            {formStep === 1 && (
              <>
                <UploadImages
                  title={`Upload Vehicle Pictures`}
                  refId={refId}
                  backArrow={"back"}
                  SetFormStep={SetFormStep}
                  uploadType={"vehicle"}
                />
                <button
                  type="button"
                  className="btn  btn-primary"
                  onClick={() => setFormStep(2)}
                  style={{ right: "150px" }}
                >
                  <i className="feather mr-2 icon-check-circle"></i>{" "}
                  {"Upload Vehicle Document "}
                </button>
              </>
            )}

            {formStep === 2 && (
              <DocumentUpload
                title={`Upload Vehicle Documents`}
                refId={refId}
                backArrow={"back"}
                SetFormStep={SetFormStep}
                uploadType={"vehicle"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
//Login.layout = "main";

export default AddEditVehicle;
