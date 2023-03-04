import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import AddEditVehicle from "../../components/form/vehicle/AddEditVehicle";
import { GlobalContext } from "../../context/Provider";
import dynamic from "next/dynamic";

function DeleteData({ query }) {
  const {
    authState: { user },
  } = useContext(GlobalContext);

  //  const router = useRouter()
  const { tbl, fld, val } = query;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  function onSubmit(formdata) {
    deleteData(formdata);
  }

  function deleteData(formdata) {
    createShipment(formdata)(shipmentDispatch)((res) => {
      if (res) {
        setRefId(res.data.ShipmentId);

        toast.success("Created new Shipment successfully");
        setFormStep(1);
        console.log("formstep", formStep);
      }
    })((error) => {
      toast.error(error);
    });
  }
  useEffect(() => {}, []);
  //console.log('data', driverdata)
  return (
    <>
      <MainLayout>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header alert alert-info">
              <h2> Attention!- Delete Action </h2>
            </div>
            <div className="card-body">
              <div className="col-md-12 ">
                <h4> Sure you want to delete the record? </h4>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-row">
                    <div className="col-sm-10 ">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="hidden"
                          value={tbl}
                          id="tbl"
                          required
                        />
                        <input
                          className="form-check-input"
                          type="hidden"
                          value={fld}
                          id="fld"
                          required
                        />
                        <input
                          className="form-check-input"
                          type="hidden"
                          value={val}
                          id="fld"
                          required
                        />
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

                  <div className="form-group"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
//Login.layout = "main";
//export default AddVehicle;

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(DeleteData), { ssr: false });
