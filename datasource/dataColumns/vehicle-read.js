import { Form } from "react-bootstrap";
import Link from "next/link";
import { LOAD_TYPE } from "../../constants/enum";
export const columns = (params) => [
  {
    id: 3,
    name: "VIN / CHASIS NO",

    cell: (row) => [
      <>
        {" "}
        <Link
          href={
            "/vehicle/vehicle-action/?vehicleId=" +
            row?.VehicleId +
            "&readOnly=true"
          }
        >
          <a className="btn-link" title="click to view vehicle details">
            {" "}
            {row?.VehicleNumber}{" "}
          </a>
        </Link>
      </>,
    ],
    sortable: true,
    reorder: true,
  },
  {
    id: 1,
    name: "Carrier Name",
    selector: null,
    cell: (row) => [<>{row?.Carrier?.CarrierType}</>],
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Vehicle Type",
    selector: null,
    cell: (row) => [
      <>{LOAD_TYPE.find((item) => item.value === row?.VehicleType).text}</>,
    ],
    sortable: true,
    reorder: true,
  },

  {
    id: 4,
    name: "Vehicle Color",
    selector: null,
    cell: (row) => [<>{row?.VehicleColor}</>],
    sortable: true,
    reorder: true,
  },

  {
    id: 5,
    name: "Vehicle Model",
    selector: null,
    cell: (row) => [<>{row?.VehicleModel}</>],
    sortable: true,
    reorder: true,
  },

  {
    id: 6,
    name: "License Plate",
    selector: null,
    cell: (row) => [<>{row?.LicensePlate}</>],
    sortable: true,
    reorder: true,
  },

  {
    id: 7,
    name: "Purchase Year",
    selector: null,
    cell: (row) => [<>{row?.PurchaseYear}</>],
    sortable: true,
    reorder: true,
  },

  {
    id: 9,
    name: "Insured?",
    selector: null,
    cell: (row) => [
      <>
        <Form.Check
          type="checkbox"
          id="custom-switch"
          checked={row?.Insured}
          disabled
        />
      </>,
    ],
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 10,
    name: "PicUrl",
    selector: null,
    cell: (row) => [<>{row?.PicUrl}</>],
    sortable: true,
    reorder: true,
  },
  {
    id: 11,
    name: "Vehicle Docs",
    selector: null,
    cell: (row) => [<>{row?.VehicleDocs}</>],
    sortable: true,
    reorder: true,
  },
  params?.roles === "admin" && {
    id: 12,
    name: "Created Date",
    selector: null,
    cell: (row) => [<>{row?.createdAt}</>],
    sortable: true,
    right: true,
    reorder: true,
  },
  params?.roles === "admin" && {
    id: 13,
    name: "Updated Date",
    selector: null,
    cell: (row) => [<>{row?.updatedAt}</>],
    sortable: true,
    right: true,
    reorder: true,
  },
];
