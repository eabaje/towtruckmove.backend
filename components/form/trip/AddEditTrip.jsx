import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { Country, State } from "country-state-city";
import { GlobalContext } from "../../../context/Provider";

import {
  createTrip,
  editTrip,
} from "../../../context/actions/trip/trip.action";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchData } from "../../../helpers/query";

import { toast } from "react-toastify";

const AddEditTrip = ({ query }) => {
  const { tripId, shipmentId, Istrackable, isReadOnly } = query;

  // const { SubscribeId } = match.params;
  const isAddMode = !tripId;

  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [pickUpRegion, setPickUpRegion] = useState([]);
  const [deliveryRegion, setdeliveryRegion] = useState([]);

  const [selpickUpRegion, setselpickUpRegion] = useState("");
  const [seldeliveryRegion, setseldeliveryRegion] = useState("");

  const [readOnly, setReadOnly] = useState(false);
  // const onSubmit = (data) => console.log(data);
  const {
    authState: { user },
  } = useContext(GlobalContext);
  useEffect(() => {
    if (isReadOnly) setReadOnly(!readOnly);
    setCountries((countries) => (countries = Country.getAllCountries()));

    // console.log(`user`, user.CompanyId);
    if (!isAddMode) {
      fetchData(
        "trip/findOne",
        tripId
      )((trip) => {
        //  console.log(`shipment`, shipment);
        const fields = [
          "ShipmentId",
          "DriverName",
          "CompanyId",
          "VehicleId",
          "Duration",
          "Description",
          "PickUpRegion",
          "PickUpCountry",
          "PickUpLocation",
          "DeliveryCountry",
          "DeliveryRegion",
          "DeliveryLocation",
          "ExpectedPickUpDate",
          "ExpectedDeliveryDate",
          "DriverNote",
        ];
        fields.forEach((field) => setValue(field, trip[field]));

        setPickUpRegion(
          (pickUpRegion) =>
            // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
            (pickUpRegion = State.getStatesOfCountry(trip["PickUpCountry"]))
        );

        setdeliveryRegion(
          (deliveryRegion) =>
            // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
            (deliveryRegion = State.getStatesOfCountry(trip["DeliveryCountry"]))
        );

        setselpickUpRegion(trip["PickUpRegion"]);
        setseldeliveryRegion(trip["DeliveryRegion"]);
      })((err) => {
        toast.error(err);
      });
    }
  }, []);

  const selectPickUpCountry = async (e) => {
    setCountry((country) => e.target.value);

    setPickUpRegion(
      (pickUpRegion) =>
        // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
        (pickUpRegion = State.getStatesOfCountry(e.target.value))
    );
  };

  const selectDeliveryCountry = async (e) => {
    setCountry((country) => e.target.value);

    setdeliveryRegion(
      (deliveryRegion) =>
        // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
        (deliveryRegion = State.getStatesOfCountry(e.target.value))
    );
  };
  const {
    register: tripform,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm();

  const {
    tripDispatch,
    tripState: {
      createTrip: { data: tripdata, error: triperror },
    },
  } = useContext(GlobalContext);

  function onSubmit(formdata) {
    return isAddMode ? CreateTrip(formdata) : updateTrip(formdata, tripId);
  }

  function CreateTrip(formdata) {
    // formdata.CompanyId = user.CompanyId;
    // formdata.UserId = user.UserId;

    createTrip(formdata)(tripDispatch)((res) => {
      if (res) {
        toast.success("Created new Trip enytry successfully");
      }
    })((err) => {
      toast.error(err);
    });
  }

  function updateTrip(formdata, tripId) {
    editTrip(formdata, tripId)(tripDispatch)((res) => {
      if (res) {
        toast.success("Updated record successfully");
      }
    })((err) => {
      toast.error(err);
    });
  }

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
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header alert alert-info">
              <h2> Trip Entry Information</h2>
            </div>
            <div className="card-body">
              <div className="col-md-12 ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="hidden"
                    value={user.UserId}
                    className="form-control"
                  />
                  <input
                    type="hidden"
                    value="DriverId"
                    className="form-control"
                  />
                  <input
                    type="hidden"
                    value={user.CompanyId}
                    className="form-control"
                  />
                  <div className="form-group row">
                    <div className="col-md-12">
                      <h5 className="alert alert-info"> Trip Basic Info </h5>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Driver Name
                    </label>
                    <div className="col-md-10">
                      <input
                        name="DriverName"
                        className="form-control"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Shipment Reference Id
                    </label>

                    <div className="col-sm-4">
                      <input
                        name="ShipmentId"
                        className="form-control"
                        placeholder="Shipment Reference Number"
                        {...tripform("ShipmentId")}
                        required
                      />
                    </div>

                    <label className="col-sm-2 col-form-label">
                      Vehicle Id
                    </label>

                    <div className="col-sm-4">
                      <input
                        name="VehicleId"
                        className="form-control"
                        placeholder="Vehicle Id"
                        {...tripform("VehicleId")}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Driver Note
                    </label>
                    <div className="col-md-10">
                      <input
                        name="DriverNote"
                        className="form-control"
                        placeholder="Driver Note"
                        {...tripform("DriverNote", {
                          required: true,
                        })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <h5 className="alert alert-info">
                        {" "}
                        Pick Up Information{" "}
                      </h5>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">Country</label>
                    <div className="col-md-4">
                      <select
                        name="PickUpCountry"
                        className="form-control"
                        {...tripform("PickUpCountry")}
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

                    <label className="col-form-label col-md-2">
                      Region/State
                    </label>
                    <div className="col-md-4">
                      <select
                        name="PickUpRegion"
                        className="form-control"
                        id="PickUpRegion"
                        {...tripform("PickUpRegion")}
                        required
                      >
                        <option value=""> Select Region/State </option>
                        {pickUpRegion.map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      PickUp Address
                    </label>

                    <div className="col-md-4">
                      <input
                        name="PickUpLocation"
                        className="form-control"
                        placeholder="Pick Up Location"
                        {...tripform("PickUpLocation", {
                          required: true,
                        })}
                        required
                      />
                    </div>
                    <label className="col-form-label col-md-2">
                      PickUp Date
                    </label>
                    <div className="col-md-4">
                      <Controller
                        name={"ExpectedPickUpDate"}
                        control={control}
                        // defaultValue={new Date()}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <DatePicker
                              wrapperclassNameName="datePicker"
                              classNameName="form-control datepicker"
                              onChange={onChange}
                              selected={value}
                              placeholderText="Enter date"
                              customInput={<CustomInput />}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <h5 className="alert alert-info">
                        {" "}
                        Delivery Information{" "}
                      </h5>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">Country</label>

                    <div className="col-md-4">
                      <select
                        name="DeliveryCountry"
                        className="form-control"
                        {...tripform("DeliveryCountry")}
                        onChange={selectDeliveryCountry}
                      >
                        <option value="">Select Country</option>
                        {countries.map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <label className="col-form-label col-md-2">
                      Region/State
                    </label>
                    <div className="col-md-4">
                      <select
                        name="DeliveryRegion"
                        className="form-control"
                        id="DeliveryRegion"
                        {...tripform("DeliveryRegion", {
                          required: true,
                        })}
                      >
                        <option value=""> Select Region/State </option>
                        {deliveryRegion.map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Location/Address
                    </label>

                    <div className="col-md-10">
                      <input
                        name="DeliveryLocation"
                        className="form-control"
                        placeholder="Delivery Location"
                        {...tripform("DeliveryLocation")}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Trip Duration
                    </label>

                    <div className="col-md-4">
                      <input
                        type="number"
                        name="Duration"
                        className="form-control"
                        placeholder="Trip Duration"
                        {...tripform("Duration")}
                        required
                      />
                    </div>

                    <label className="col-form-label col-md-2">
                      Delivery Date
                    </label>
                    <div className="col-md-4">
                      <Controller
                        name={"ExpectedDeliveryDate"}
                        control={control}
                        // defaultValue={new Date()}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <DatePicker
                              wrapperclassNameName="datePicker"
                              classNameName="form-control datepicker"
                              onChange={onChange}
                              selected={value}
                              placeholderText="Enter date"
                              customInput={<CustomInput />}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <h5 className="alert alert-info"> Driver Note </h5>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Driver Note(s)
                    </label>

                    <div className="col-md-10">
                      <input
                        name="DriverNote"
                        className="form-control"
                        placeholder=" Driver Note"
                        {...tripform("DriverNote")}
                      />
                    </div>
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
                      <button
                        type="submit"
                        className="btn  btn-primary"
                        style={{ float: "right" }}
                      >
                        <i className="feather mr-2 icon-check-circle"></i>{" "}
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
//Login.layout = "main";

export default AddEditTrip;
