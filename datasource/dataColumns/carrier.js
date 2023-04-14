import { Form } from "react-bootstrap";
import Link from "next/link";
import { LOAD_CAPACITY, LOAD_TYPE } from "../../constants/enum";
export const columns = (params) => [
  {
    id: 1,
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (row) => [
      params?.roles === "carrier" && (
        <Link
          href={"/carrier/carrier-action/?carrierId=" + row.CarrierId}
          passHref
        >
          <a className="btn btn-sm" title="Edit  Carrier Info">
            {" "}
            <i className="first fas fa-pen"></i>
          </a>
        </Link>
      ),

      params?.roles === "carrier" && (
        <Link
          href={
            "/vehicle/vehicle-action/?companyId=" +
            row.CompanyId +
            "&carrierId=" +
            row.CarrierId +
            "&carrierType=" +
            row.CarrierType
          }
          passHref
        >
          <a className="btn btn-sm" title="Add Vehicle to carrier">
            {" "}
            <i className="first fas fa-car"></i>
          </a>
        </Link>
      ),
      params?.roles === "carrier" && (
        <Link
          href={
            "/vehicle/?carrierId=" +
            row.CarrierId +
            "&carrierType=" +
            row.CarrierType
          }
          passHref
        >
          <a className="btn btn-sm" title="List all Carrier Vehicle ">
            <i className="first fas fa-truck"></i>
          </a>
        </Link>
      ),
      params?.roles === "admin" && (
        <Link
          href={"/delete-data/?tbl=Carriers&fld=CarrierId&val=" + row.CarrierId}
          passHref
        >
          <a
            className="btn btn-sm"
            title="Delete/Archive Redundant/Incorrect data"
          >
            {" "}
            <i className="fas fa-trash-alt"></i>
          </a>
        </Link>
      ),
    ],
  },
  {
    id: 2,
    name: "Company",
    selector: (row) => row?.Company?.CompanyName,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: "Carrier Type",
    selector: (row) =>
      LOAD_TYPE.find((item) => item.value === row.CarrierType).text,
    sortable: true,
    reorder: true,
  },
  {
    id: 4,
    name: "Fleet Type",
    selector: (row) =>
      LOAD_CAPACITY.find((item) => item.value === row.FleetType).text,
    sortable: true,
    reorder: true,
  },
  {
    id: 5,
    name: "Fleet Number",
    selector: (row) => row.FleetNumber,
    sortable: true,
    reorder: true,
  },

  {
    id: 6,
    name: "Licensed?",
    selector: (row) => (
      <Form.Check
        type="checkbox"
        id="custom-switch"
        checked={row.Licensed}
        disabled
      />
    ),
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 7,
    name: "AboutUs",
    selector: (row) => row.AboutUs,
    sortable: true,
    reorder: true,
  },
  {
    id: 8,
    name: "Service Description",
    selector: (row) => row.ServiceDescription,
    sortable: true,
    reorder: true,
  },
  {
    id: 9,
    name: "Rating",
    selector: (row) => row.Rating,
    sortable: true,
    reorder: true,
  },

  {
    id: 10,
    name: "Created Date",
    selector: (row) => row.createdAt,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 11,
    name: "Updated Date",
    selector: (row) => row.updatedAt,
    sortable: true,
    right: true,
    reorder: true,
  },
];
