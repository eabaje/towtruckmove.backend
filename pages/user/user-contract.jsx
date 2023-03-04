import React, { useState, useContext, useEffect } from "react";
import { listUserSubscriptions } from "../../context/actions/user/user.action";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "../../context/Provider";
import { columns } from "../../datasource/dataColumns/usersubscription";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import axios from "axios";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";
import {
  editShipment,
  listShipmentsByShipmentId,
  listShipmentsByUserId,
} from "../../context/actions/shipment/shipment.action";
import { useRouter } from "next/router";
import { API_URL } from "../../constants";
// import SortIcon from "@mui/icons-material/ArrowDownward";

function UserContract({ query }) {
  const router = useRouter();
  const { shipmentId, userId, companyId, action } = query;
  const [LoadSpinner, setLoadSpinner] = useState({
    loadInterest: false,
    loadListing: false,
    loadAssign: false,
    loadDispatch: false,
    loadPickedUp: false,
    loadDelivery: false,
    loadCancel: false,
    loadArchive: false,
    loadRemind: false,
    loadAccept: false,
  });
  const {
    authState: { user },
  } = useContext(GlobalContext);
  const {
    userDispatch,
    shipmentDispatch,
    shipmentState: {
      createShipment: { data: createData },
      Shipment: { data: dataShipment, loading },
    },
  } = useContext(GlobalContext);
  const {
    register: shipmentform,
    formState: { errors },
    handleSubmit: handleShipment,
    setValue,
    control,
  } = useForm();
  function onSubmit(formdata) {
    return companyId
      ? contractSignedAction(shipmentId, companyId, userId)
      : updateShipment(formdata, shipmentId);
  }

  function updateShipment(formdata, shipmentId) {
    editShipment(formdata, shipmentId)(shipmentDispatch)((res) => {
      if (res) {
        toast.success("Contract created successfully");
      }
      setTimeout(() => {
        toast.dismiss();
        router.reload(`/shipment/?userId=${user.UserId}`);
      }, 5000);
    })((error) => {
      toast.error(error);
    });
  }
  function redirectPage() {
    setTimeout(() => {
      toast.dismiss();
      user.roles === "carrier"
        ? router.reload(`/shipment/?companyId=${user.CompanyId}`)
        : user.roles === "shipper"
        ? router.reload(`/shipment/?userId=${user.UserId}`)
        : router.reload(`/shipment/?companyId=${user.CompanyId}`);
    }, 5000);
  }
  const contractSignedAction = async (shipmentId, companyId, userId) => {
    setLoadSpinner({ loadSigned: true });
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
      Role: user?.roles,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/contractSigned`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner({ loadSigned: false });
        redirectPage();
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner({ loadSigned: false });
    }
  };
  useEffect(() => {
    //  if (!data) {
    listShipmentsByShipmentId(shipmentId)(shipmentDispatch)((res) => {})(
      (err) => {
        toast.error(err);
      }
    );
    //  }
    // console.log(`loading`, loading);
  }, []);
  console.log(`data`, dataShipment);
  return (
    <MainLayout>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h3>My Contract</h3>
            <hr />
            <p class="alert alert-info">
              If you post vehicles for shipment and have a pre-existing dispatch
              contract that you would like to use with your Load Dispatch
              dispatch sheets, you may copy and paste it below. Once you have
              added your contract, each carrier will be required to sign your
              contract at the same time they sign the dispatch sheet.
              <b>
                Please Note: Modifying your contract will NOT modify it for any
                dispatches that have been previously signed by the carrier.
              </b>
            </p>
          </div>
          <div className="card-body table-border-style">
            <div class="panel panel-default">
              <div class="panel-body">
                {shipmentId && userId && action === "add" && (
                  <form onSubmit={handleShipment(onSubmit)}>
                    <input
                      type="hidden"
                      name="ShipmentId"
                      className="form-control"
                      value={shipmentId}
                      {...shipmentform("ShipmentId")}
                    />

                    <input
                      type="hidden"
                      name="UserId"
                      className="form-control"
                      value={userId}
                      {...shipmentform("UserId")}
                    />
                    <div class="form-group has-feedback">
                      <textarea
                        class="form-control"
                        id="ShipmentDocs"
                        name="ShipmentDocs"
                        rows="30"
                        required
                        value={dataShipment?.data?.ShipmentDocs}
                        placeholder="Enter contract statement"
                        {...shipmentform("ShipmentDocs")}
                      ></textarea>
                      <span
                        class="glyphicon form-control-feedback"
                        aria-hidden="true"
                      ></span>
                      <span class="help-block with-errors text-right small"></span>
                    </div>
                    <div class="form-group text-right">
                      <input
                        class="btn btn-primary"
                        type="submit"
                        value="Submit Contract"
                      />
                    </div>
                  </form>
                )}

                {shipmentId && companyId && userId && action === "sign" && (
                  <form onSubmit={handleShipment(onSubmit)}>
                    <input
                      type="hidden"
                      name="ShipmentId"
                      className="form-control"
                      value={shipmentId}
                      {...shipmentform("ShipmentId")}
                    />
                    <input
                      type="hidden"
                      name="CompanyId"
                      className="form-control"
                      value={companyId}
                      {...shipmentform("CompanyId")}
                    />
                    <input
                      type="hidden"
                      name="UserId"
                      className="form-control"
                      value={userId}
                      {...shipmentform("UserId")}
                    />
                    <div class="form-group has-feedback">
                      <textarea
                        class="form-control"
                        id="ShipmentDocs"
                        name="ShipmentDocs"
                        rows="30"
                        required
                        value={dataShipment?.data?.ShipmentDocs}
                        placeholder="Enter contract statement"
                        {...shipmentform("ShipmentDocs")}
                      ></textarea>
                      <span
                        class="glyphicon form-control-feedback"
                        aria-hidden="true"
                      ></span>
                      <span class="help-block with-errors text-right small"></span>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="IsContractSigned"
                        type="checkbox"
                        {...shipmentform("IsContractSigned", {
                          required: true,
                        })}
                        required
                      />
                      <label className="form-check-label">
                        Are you Ok with the contract
                      </label>
                      <div className="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                    <div class="form-group text-right">
                      <input
                        class="btn btn-primary"
                        type="submit"
                        value="I Accept"
                      />
                    </div>
                  </form>
                )}
                {shipmentId && userId && action === "review" && (
                  <div class="form-group has-feedback">
                    <textarea
                      class="form-control"
                      id="ShipmentDocs"
                      name="ShipmentDocs"
                      rows="30"
                      required
                      value={dataShipment?.data?.ShipmentDocs}
                    ></textarea>
                    <span
                      class="glyphicon form-control-feedback"
                      aria-hidden="true"
                    ></span>
                    <span class="help-block with-errors text-right small"></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
//Login.layout = "main";
//export default UserSubscription;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(UserContract), { ssr: false });
