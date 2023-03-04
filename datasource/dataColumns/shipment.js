import { Form } from "react-bootstrap";
import Link from "next/link";
import { LOAD_CAPACITY, LOAD_TYPE, TRIP_STATUS } from "../../constants/enum";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";

import { showInterest } from "../../context/actions/shipment/shipment.action";
import React, { useContext } from "react";
import { API_URL } from "../../constants";
import axios from "axios";
// {
// showInterestAction,
// dispatchShipmentAction,
// pickedUpShipmentAction,
// deliveredShipmentAction,
// cancelShipmentAction,
// archiveShipmentAction,
// sendRemindEmailAction,
// contractSignedAction,
// contractSignedAction,
// contractAcceptedAction,
// }
// = action,

function formatMoney(number, decPlaces, decSep, thouSep) {
  (decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces),
    (decSep = typeof decSep === "undefined" ? "." : decSep);
  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
  var sign = number < 0 ? "-" : "";
  var i = String(
    parseInt((number = Math.abs(Number(number) || 0).toFixed(decPlaces)))
  );
  var j = (j = i.length) > 3 ? j % 3 : 0;

  return (
    sign +
    (j ? i.substr(0, j) + thouSep : "") +
    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
    (decPlaces
      ? decSep +
        Math.abs(number - i)
          .toFixed(decPlaces)
          .slice(2)
      : "")
  );
}

function format2(n, currency) {
  return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function format3(n, currency) {
  return new Intl.NumberFormat("ru", {
    style: "currency",
    currency: currency,
  }).format(n);
}

function format1(n, currency) {
  return (
    currency +
    Number(n)
      .toFixed(2)
      .replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
      })
  );
}

const CustomTitle = ({ row }) => (
  <div>
    {}
    <div>{row.title}</div>
    <div>
      <div
        data-tag="allowRowEvents"
        style={{
          color: "grey",
          overflow: "hidden",
          whiteSpace: "wrap",
          textOverflow: "ellipses",
        }}
      >
        {}
        {row.plot}
      </div>
    </div>
  </div>
);

export const columns = (
  loadSpinner,
  params,
  params1,
  params2 = null,
  params3 = null,
  params4 = null,
  params5 = null,
  params6 = null
) => [
  {
    id: 27,
    name: "",
    sortable: false,
    selector: "null",
    style: {
      display: "flex",
      flexDirection: "column",
      padding: "10px",
    },
    grow: 3,
    cell: (row) => [
      params?.UserId === row?.UserId &&
        params?.roles === "shipper" &&
        row?.AssignedShipment !== true && (
          <Link
            href={
              "/shipment/shipment-interest-list/?shipmentId=" + row.ShipmentId
            }
            passHref
          >
            <a
              className="btn btn-outline-primary flex-item"
              title="Check shipment interests"
            >
              <i className="first fas fa-check"></i>Check interests (
              {row?.ShipmentsInteresteds.length})
            </a>
          </Link>
        ),

      params?.roles === "carrier" &&
        row?.ShipmentStatus !== "NotAssigned" &&
        // row?.Company?.CompanyId === params?.CompanyId &&
        row?.AssignDriverShipment?.IsAssigned === true && (
          <Link
            href={
              "/shipment/assign-shipment/?shipmentId=" +
              row.ShipmentId +
              "&companyId=" +
              row?.AssignDriverShipment?.CompanyId +
              "&driverId=" +
              row?.AssignDriverShipment?.DriverId +
              "&action=review&review=review"
            }
            passHref
          >
            <a
              className="btn btn-outline-primary flex-item"
              title="Check Assignment"
            >
              <i className="first fas fa-eye"></i>Check Assignment
            </a>
          </Link>
        ),

      params?.roles === "shipper" &&
        row?.ShipmentStatus !== "NotAssigned" &&
        // row?.Company?.CompanyId === params?.CompanyId &&
        row?.AssignDriverShipment?.IsAssigned === true && (
          <Link
            href={
              "/shipment/assign-shipment/?shipmentId=" +
              row.ShipmentId +
              "&companyId=" +
              row?.AssignDriverShipment?.CompanyId +
              "&driverId=" +
              row?.AssignDriverShipment?.DriverId +
              "&action=review&review=review"
            }
            passHref
          >
            <a
              className="btn btn-outline-primary flex-item"
              title="Check Assignment"
            >
              <i className="first fas fa-eye"></i>Check Assignment
            </a>
          </Link>
        ),

      params?.roles === "carrier" &&
        row?.ShipmentStatus === "Assigned" &&
        row?.AssignDriverShipment?.IsAssigned === true && (
          <Link
            href={
              "/shipment/assign-shipment-list/?shipmentId=" +
              row.ShipmentId +
              "&companyId=" +
              params?.CompanyId
            }
            passHref
          >
            <a
              className="btn btn-outline-primary flex-item"
              title="Check Assignment"
            >
              <i className="first fas fa-id-card-o"></i>Check Assigned Driver
            </a>
          </Link>
        ),
      // row?.AssignDriverShipment?.AssignedToDriver === params?.UserId &&
      params?.roles === "driver" &&
        row?.ShipmentStatus === "Assigned" &&
        row?.AssignDriverShipment?.IsAssigned === true && (
          <>
            <button
              type="button"
              className="btn btn-outline-primary flex-item"
              onClick={params1.bind(
                this,
                row.ShipmentId,
                params.CompanyId,
                params.UserId
              )}
            >
              {loadSpinner.loadDispatch ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin"></i> Processing
                </>
              ) : (
                <>
                  {" "}
                  <i
                    title="Dispatch Shipment"
                    className="first fas fa-paper-plane"
                  ></i>
                  Dispatch Shipment
                </>
              )}
            </button>
          </>
        ),

      //  row?.AssignDriverShipment?.AssignedToDriver === params?.UserId &&
      params?.roles === "shipper" &&
        row?.ShipmentStatus === "Dispatched" &&
        row?.AssignDriverShipment?.IsAssigned === true && (
          <>
            <button
              type="button"
              className="btn btn-outline-primary flex-item"
              onClick={params1.bind(
                this,
                row.ShipmentId,
                row?.AssignDriverShipment?.CompanyId,
                params.UserId,
                params.roles
              )}
            >
              {loadSpinner.loadPickedUp ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin"></i> Processing
                </>
              ) : (
                <>
                  {" "}
                  <i
                    title="PickUp Shipment"
                    className="first fas fa-paper-plane"
                  ></i>
                  Shipment Picked
                </>
              )}
            </button>
          </>
        ),

      params?.roles === "driver" &&
        row?.ShipmentStatus === "Dispatched" &&
        row?.AssignDriverShipment?.IsAssigned === true && (
          <>
            <button
              type="button"
              className="btn btn-outline-primary flex-item"
              onClick={params1.bind(
                this,
                row.ShipmentId,
                row?.AssignDriverShipment?.CompanyId,
                params.UserId,
                params.roles
              )}
            >
              {loadSpinner.loadPickedUp ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin"></i> Processing
                </>
              ) : (
                <>
                  {" "}
                  <i
                    title="Confirm PickUp Shipment"
                    className="first fas fa-paper-plane"
                  ></i>
                  Confirm Shipment Picked
                </>
              )}
            </button>
          </>
        ),

      params?.roles === "driver" &&
        row?.ShipmentStatus === "PickedUp" &&
        row?.AssignDriverShipment?.IsAssigned === true &&
        row?.AssignDriverShipment?.AssignedToDriver === params?.UserId && (
          <>
            <button
              type="button"
              className="btn btn-outline-primary flex-item"
              onClick={params1.bind(
                this,
                row.ShipmentId,
                params.CompanyId,
                params.UserId,
                params.roles
              )}
            >
              {loadSpinner.loadDelivered ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin"></i> Processing
                </>
              ) : (
                <>
                  {" "}
                  <i
                    title="Delivered Shipment"
                    className="first fas fa-paper-plane"
                  ></i>
                  Delivered Shipment
                </>
              )}
            </button>
          </>
        ),

      //Chat with Driver between pick up and delivered

      params?.roles === "shipper" &&
        row?.ShipmentStatus === "Delivered" &&
        row?.AssignDriverShipment?.IsAssigned === true && (
          <>
            <button
              type="button"
              className="btn btn-outline-primary flex-item"
              onClick={params3.bind(
                this,
                row?.ShipmentId,
                params?.FullName,
                params?.roles
              )}
            >
              <i
                title="Chat with Driver"
                className="first fas fa-paper-plane"
              ></i>
              Chat with Driver
            </button>
          </>
        ),

      //Chat with Shipper between pick up and delivered

      params?.roles === "driver" &&
        row?.ShipmentStatus === "Delivered" &&
        row?.AssignDriverShipment?.IsAssigned === true &&
        row?.AssignDriverShipment?.AssignedToDriver === params?.UserId && (
          <>
            <button
              type="button"
              className="btn btn-outline-primary flex-item"
              onClick={params3.bind(
                this,
                row?.ShipmentId,
                params?.FullName,
                params?.roles
              )}
            >
              {loadSpinner.loadDelivered ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin"></i> Processing
                </>
              ) : (
                <>
                  {" "}
                  <i
                    title="Place interest"
                    className="first fas fa-paper-plane"
                  ></i>
                  Chat with Shipper
                </>
              )}
            </button>
          </>
        ),

      params?.roles === "shipper" &&
        row?.ShipmentStatus === "Delivered" &&
        //  row?.AssignDriverShipment?.IsAssigned === true &&
        row?.TrackShipments.find(
          (item) =>
            item.EndAction !== "ConfirmDelivered" &&
            item.StartAction === "Delivered"
        ) && (
          <>
            <button
              type="button"
              className="btn btn-outline-primary flex-item"
              onClick={params1.bind(
                this,
                row.ShipmentId,
                params.CompanyId,
                params.UserId,
                params.roles
              )}
            >
              {loadSpinner.loadDelivered ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin"></i> Processing
                </>
              ) : (
                <>
                  {" "}
                  <i
                    title="Confirm Delivered Shipment"
                    className="first fas fa-paper-plane"
                  ></i>
                  Confirm Delivered Shipment
                </>
              )}
            </button>
          </>
        ),

      params?.roles === "shipper" &&
        row?.ShipmentStatus === "Assigned" &&
        row?.AssignDriverShipment?.IsAssigned === true && (
          <Link
            href={
              "/shipment/assign-shipment-list/?shipmentId=" +
              row.ShipmentId +
              "&companyId=" +
              params?.CompanyId
            }
            passHref
          >
            <a
              className="btn btn-outline-primary flex-item"
              title="Check Assignment"
            >
              <i className="first fas fa-briefcase"></i>Check Assigned Driver
            </a>
          </Link>
        ),
      params?.roles === "carrier" &&
        row?.ShipmentStatus === "Assigned" &&
        row?.AssignShipment?.IsContractAccepted === true &&
        row?.AssignDriverShipment?.IsAssigned !== true && (
          <Link
            href={
              "/shipment/assign-shipment/?shipmentId=" +
              row.ShipmentId +
              "&action=driver&companyId=" +
              params?.CompanyId
            }
            passHref
          >
            <a
              className="btn btn-outline-primary flex-item"
              title="Assign to Driver"
            >
              <i className="first fas fa-user"></i>Assign to Driver{" "}
            </a>
          </Link>
        ),
      params?.roles === "carrier" && row?.ShipmentStatus === "NotAssigned" && (
        <>
          <button
            type="button"
            className="btn btn-outline-primary flex-item"
            onClick={params1.bind(
              this,
              row.ShipmentId,
              params.CompanyId,
              params.UserId
            )}
          >
            {loadSpinner.loadInterest ? (
              <>
                {" "}
                <i className="fa fa-spinner fa-spin"></i> Processing
              </>
            ) : (
              <>
                {" "}
                {row?.ShipmentsInteresteds.filter(
                  (item) =>
                    item?.UserId === params?.UserId &&
                    item?.IsInterested === true
                ).length > 0 ? (
                  <>
                    <i
                      title="Place interest"
                      className="first fas fa-times"
                    ></i>{" "}
                    Remove interest{" "}
                  </>
                ) : (
                  <>
                    <i
                      title="Place interest"
                      className="first fas fa-heart"
                    ></i>
                    Place interest{" "}
                  </>
                )}
              </>
            )}
          </button>
        </>
      ),

      params?.roles === "shipper" &&
        row?.AssignShipment?.IsContractSigned === false && (
          <>
            <button
              type="button"
              className="btn btn-outline-primary flex-item"
              onClick={params3.bind(
                this,
                row.ShipmentId,
                row?.AssignShipment?.CompanyId,
                row.UserId
              )}
            >
              {loadSpinner.loadRemind ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin"></i> Processing
                </>
              ) : (
                <>
                  {" "}
                  <i
                    title="Archive Record"
                    className="first fas fa-envelope-open"
                  ></i>
                  Send Remind Email{" "}
                </>
              )}
            </button>
          </>
        ),
      params?.roles === "shipper" &&
        row?.AssignShipment?.IsContractSigned === true &&
        row?.AssignShipment?.IsContractConfirmed === false && (
          <>
            <button
              type="button"
              className="btn btn-outline-primary flex-item"
              onClick={params4.bind(
                this,
                row.ShipmentId,
                row?.AssignShipment?.CompanyId,
                row.UserId
              )}
            >
              {loadSpinner.loadSigned ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin"></i> Processing
                </>
              ) : (
                <>
                  {" "}
                  <i title="Archive Record" className="first fas fa-check"></i>
                  Confirm Contract Signed{" "}
                </>
              )}
            </button>
          </>
        ),

      params?.roles === "carrier" &&
        row?.ShipmentStatus === "Assigned" &&
        row?.ShipmentDocs &&
        row?.AssignShipment?.IsContractSigned === false && (
          <Link
            href={
              "/user/user-contract/?shipmentId=" +
              row.ShipmentId +
              "&userId=" +
              params.UserId +
              "&companyId=" +
              params.CompanyId +
              "&action=sign"
            }
            passHref
          >
            <a
              className="btn btn-outline-primary flex-item"
              title="Check Contract"
            >
              <i className="first fas fa-eye"></i>Check Contract{" "}
            </a>
          </Link>
        ),

      params?.roles === "shipper" &&
        //  row?.ShipmentStatus === "Assigned" &&
        // row?.AssignShipment?.IsContractSigned === false &&
        row?.ShipmentDocs === null && (
          <Link
            href={
              "/user/user-contract/?shipmentId=" +
              row.ShipmentId +
              "&userId=" +
              row.UserId +
              "&action=add"
            }
            passHref
          >
            <a
              className="btn btn-outline-primary flex-item"
              title="Add Contract"
            >
              <i className="first fas fa-eye"></i>Add Contract{" "}
            </a>
          </Link>
        ),

      params?.roles === "shipper" &&
        row?.AssignShipment?.IsContractConfirmed === true &&
        row?.AssignShipment?.IsContractAccepted === false && (
          <>
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-outline-primary flex-item"
                onClick={params5.bind(
                  this,
                  row.ShipmentId,
                  row?.AssignShipment?.CompanyId,
                  row.UserId
                )}
              >
                {loadSpinner.loadAccept ? (
                  <>
                    {" "}
                    <i className="fa fa-spinner fa-spin"></i> Processing
                  </>
                ) : (
                  <>
                    {" "}
                    <i
                      title="Accept Dispatch Contract"
                      className="first fas fa-check-circle-o"
                    ></i>
                    Accept Signed Contract{" "}
                  </>
                )}
              </button>
            </div>
          </>
        ),
    ],
  },

  {
    id: 1,
    name: `Name`,
    selector: (row) => row.User.FullName,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Company",
    selector: (row) => row?.Company?.CompanyName,
    cell: (row) => (
      <div
        style={{
          fontWeight: "bold",
        }}
      >
        {row?.Company?.CompanyName}
      </div>
    ),
    sortable: true,
    reorder: true,
  },
  {
    id: 27,
    name: "Price Offer",
    sortable: true,
    reorder: true,
    grow: 2,
    cell: (row) => (
      <div
        style={{
          fontWeight: "bold",
        }}
      >
        {row?.ShipmentRequestPrice
          ? format1(Number(row?.ShipmentRequestPrice).toFixed(1), "NGN")
          : row?.ShipmentRequestPrice}{" "}
      </div>
    ),
  },
  // {
  //   id: 3,
  //   name: "Load Category",
  //   selector: (row) =>
  //     LOAD_TYPE.find((item) => item.value === row.LoadCategory).text,
  //   sortable: true,
  //   reorder: true,
  // },
  {
    id: 4,
    name: "Shipment Item(s)",
    maxWidth: "350px",
    grow: 3,
    style: {
      backgroundColor: "rgba(63, 195, 128, 0.9)",
    },
    cell: (row) => (
      <div
        style={{
          fontWeight: "bold",
          color: "white",
          overflow: "hidden",
          whiteSpace: "wrap",
          textOverflow: "ellipses",
        }}
      >
        {row.ShipmentDetails.map((detail, i) => (
          <div key={i}>
            <div>
              {" "}
              Type-{detail?.VehicleType}
              <br />
              VIN-{detail?.VIN}
            </div>
            <div>
              Make-
              {detail?.VehicleMake}
            </div>

            <div>
              Model-
              {detail?.VehicleModel}
            </div>

            <div>
              {" "}
              Color-
              {detail?.VehicleColor}
            </div>

            <div>
              Year-
              {detail?.VehicleModelYear}
            </div>

            <br />
            <p></p>
          </div>
        ))}
      </div>
    ),
    sortable: true,
    reorder: true,
  },

  // {
  //   id: 5,
  //   name: "Load Type",
  //   selector: (row) =>
  //     LOAD_CAPACITY.find((item) => item.value === row.LoadType).text,
  //   sortable: true,
  //   reorder: true,
  // },

  // {
  //   id: 6,
  //   name: "Load Unit",
  //   selector: (row) => row.LoadUnit,
  //   sortable: true,
  //   reorder: true,
  // },

  // {
  //   id: 7,
  //   name: "Qty",
  //   selector: (row) => row.Qty,
  //   sortable: true,
  //   reorder: true,
  // },

  {
    id: 8,
    name: "Pick Up Region",
    selector: (row) =>
      row.PickUpRegion
        ? State.getStateByCodeAndCountry(row.PickUpRegion, row.PickUpCountry)
            .name
        : row.PickUpRegion,
    sortable: true,
    reorder: true,
  },
  // {
  //   id: 9,
  //   name: "AssignedShipment?",
  //   selector: (row) => (
  //     <Form.Check
  //       type="checkbox"
  //       id="custom-switch"
  //       checked={row.AssignedShipment}
  //       disabled
  //     />
  //   ),
  //   sortable: true,
  //   right: true,
  //   reorder: true,
  // },

  {
    id: 10,
    name: "Pick Up Location",
    selector: (row) => row.PickUpLocation,
    sortable: true,
    reorder: true,
  },
  {
    id: 11,
    name: "Pick Up Country",
    selector: (row) =>
      row.PickUpCountry
        ? Country.getCountryByCode(row.PickUpCountry).name
        : row.PickUpCountry,
    sortable: true,
    reorder: true,
  },
  {
    id: 12,
    name: "Delivery Region",
    selector: (row) =>
      row.DeliveryRegion
        ? State.getStateByCodeAndCountry(
            row.DeliveryRegion,
            row.DeliveryCountry
          ).name
        : row.DeliveryRegion,
    sortable: true,
    reorder: true,
  },
  {
    id: 13,
    name: "Delivery Country",
    selector: (row) =>
      row.DeliveryCountry
        ? Country.getCountryByCode(row.DeliveryCountry).name
        : row.DeliveryCountry,
    sortable: true,
    reorder: true,
  },
  {
    id: 14,
    name: "Delivery Location",
    selector: (row) => row.DeliveryLocation,
    sortable: true,
    reorder: true,
  },
  {
    id: 15,
    name: "Expected PickUpDate",
    selector: (row) => row.ExpectedPickUpDate,
    sortable: true,
    reorder: true,
  },
  {
    id: 16,
    name: "Expected Delivery Date",
    selector: (row) => row.ExpectedDeliveryDate,
    sortable: true,
    reorder: true,
  },

  {
    id: 17,
    name: "Special Instrauction",
    selector: (row) => row.RequestForShipment,
    sortable: true,
    reorder: true,
  },
  {
    id: 18,
    name: "Shipment Request Price",
    selector: (row) => row.ShipmentRequestPrice,
    sortable: true,
    reorder: true,
  },
  {
    id: 19,
    name: "Delivery Contact Name",
    selector: (row) => row.DeliveryContactName,
    sortable: true,
    reorder: true,
  },
  {
    id: 20,
    name: "Delivery Contact Phone",
    selector: (row) => row.DeliveryContactPhone,
    sortable: true,
    reorder: true,
  },
  {
    id: 21,
    name: "Delivery Email",
    selector: (row) => row.DeliveryEmail,
    sortable: true,
    reorder: true,
  },
  {
    id: 22,
    name: "Shipment Date",
    selector: (row) => row.ShipmentDate,
    sortable: true,
    reorder: true,
  },

  {
    id: 23,
    name: "Shipment Status",
    selector: (row) =>
      TRIP_STATUS.find((item) => item.value === row.ShipmentStatus).text,
    sortable: true,
    reorder: true,
  },
  // {
  //   id: 24,
  //   name: "Shipment Docs",
  //   selector: (row) => row.ShipmentDocs,
  //   sortable: true,
  //   reorder: true,
  // },

  params?.roles === "admin" &&
    ({
      id: 25,
      name: "Created Date",
      selector: (row) => row.createdAt,
      sortable: true,
      right: true,
      reorder: true,
    },
    {
      id: 26,
      name: "Updated Date",
      selector: (row) => row.updatedAt,
      sortable: true,
      right: true,
      reorder: true,
    }),

  {
    id: 28,
    name: "",

    right: true,
    grow: 3,
    cell: (row) => [
      params?.roles === "shipper" && row?.ShipmentStatus === "Assigned" && (
        <>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={params1.bind(
              this,
              row.ShipmentId,
              params.CompanyId,
              params.UserId
            )}
          >
            {loadSpinner.loadCancel ? (
              <>
                {" "}
                <i className="fa fa-spinner fa-spin"></i> Processing
              </>
            ) : (
              <>
                {" "}
                <i title="Place interest" className="first fas fa-times"></i>
                Cancel Shipment
              </>
            )}
          </button>
        </>
      ),
      params?.roles === "shipper" && (
        <>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={params2.bind(this, row.ShipmentId)}
          >
            {loadSpinner.loadArchive ? (
              <>
                {" "}
                <i className="fa fa-spinner fa-spin"></i> Processing
              </>
            ) : (
              <>
                {" "}
                {row?.IsArchived === true ? (
                  <>
                    <i title="Show Record" className="first fas fa-eye"></i>{" "}
                    Show Record{" "}
                  </>
                ) : (
                  <>
                    <i
                      title="Archive Record"
                      className="first fas fa-archive"
                    ></i>
                    Archive Record{" "}
                  </>
                )}
              </>
            )}
          </button>
        </>
      ),

      params?.roles === "shipper" &&
        //  row?.ShipmentStatus === "Assigned" &&
        // row?.AssignShipment?.IsContractSigned === false &&
        row?.ShipmentDocs !== null && (
          <Link
            href={
              "/user/user-contract/?shipmentId=" +
              row.ShipmentId +
              "&userId=" +
              row.UserId +
              "&action=review"
            }
            passHref
          >
            <a className="btn btn-outline-primary" title="View your Contract">
              <i className="first fas fa-edit"></i>View Contract{" "}
            </a>
          </Link>
        ),

      params?.roles === "shipper" && row?.ShipmentStatus === "NotAssigned" && (
        <Link
          href={"/shipment/shipment-action/?shipmentId=" + row.ShipmentId}
          passHref
        >
          <a className="btn btn-outline-primary" title="Edit Shipment">
            <i className="first fas fa-pen"></i>Edit Shipment
          </a>
        </Link>
      ),

      params?.roles === "admin" && (
        <Link
          href={
            "/delete-data/?tbl=Shipments&fld=ShipmentId&val=" + row.ShipmentId
          }
          passHref
        >
          <a
            className="btn btn-sm"
            title="Delete/Archive (Redundant/Incorrect data)"
          >
            <i className="fas fa-trash-alt"></i>
          </a>
        </Link>
      ),
    ],
  },
];
