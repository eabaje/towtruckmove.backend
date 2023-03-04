import { Form } from "react-bootstrap";
import Link from "next/link";
import { Country, State } from "country-state-city";
import { API_URL, IMG_URL, MEDIA_URL } from "../../constants";

export const columns = (params) => [
  {
    name: "Action",
    sortable: false,
    cell: "null",
    cell: (row) => [
      <>
        {" "}
        <Link href={"/driver/driver-action/?driverId=" + row.DriverId}>
          <a className="btn btn-sm" title="Edit  Driver Info">
            {" "}
            <i className="first fas fa-pen"></i>
          </a>
        </Link>
      </>,

      <Link href={"/vehicle/?companyId=" + row.CompanyId}>
        <a className="btn btn-sm" title="Assign driver to vehicle">
          {" "}
          <i className="first fas fa-car"></i>
        </a>
      </Link>,

      params?.roles === "admin" && (
        <Link
          href={"/delete-data/?tbl=Drivers&fld=DriverId&val=" + row.DriverId}
        >
          <a
            className="btn btn-sm"
            title="Delete/Archive Redundant/Incorrect data"
          >
            <i className="fas fa-trash-alt"></i>
          </a>
        </Link>
      ),
    ],
  },

  {
    id: 1,
    name: "Company",
    cell: (row) => [<>{row.Company?.CompanyName}</>],
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Driver Name",
    cell: (row) => row.DriverName,
    sortable: true,
    reorder: true,
  },
  // {
  //   id: 3,
  //   name: "Assigned Vehicle Number",
  //   cell: (row) =>  row?.Vehicles[0]['AssignDrivers'].Assigned===true? row?.Vehicles[0]['VehicleNumber']:"",
  //   sortable: true,
  //   reorder: true,
  // },
  {
    id: 4,
    name: "Address",
    cell: (row) => row.Address,
    sortable: true,
    reorder: true,
  },

  {
    id: 5,
    name: "City",
    cell: (row) => row.City,
    sortable: true,
    reorder: true,
  },

  {
    id: 6,
    name: "Country",
    cell: (row) =>
      row.Country ? Country.getCountryByCode(row.Country).name : row.Country,
    sortable: true,
    reorder: true,
  },

  {
    id: 7,
    name: "Phone",
    cell: (row) => row.Phone,
    sortable: true,
    reorder: true,
  },

  {
    id: 8,
    name: "Email",
    cell: (row) => row.Email,
    sortable: true,
    reorder: true,
  },
  {
    id: 9,
    name: "Licensed?",
    cell: (row) => (
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
    id: 10,
    name: "PicUrl",
    cell: (row) => (
      <img
        height="84px"
        width="56px"
        className="previewThumb"
        alt={row?.DriverName}
        src={MEDIA_URL + row.PicUrl}
      />
    ),
    sortable: true,
    reorder: true,
    grow: 3,
  },
  {
    id: 11,
    name: "License Url",
    cell: (row) => (
      <a
        href={MEDIA_URL + row.LicenseUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View License
      </a>
    ),
    sortable: true,
    reorder: true,
  },
  {
    id: 12,
    name: "Rating",
    cell: (row) => row.Rating,
    sortable: true,
    reorder: true,
  },

  {
    id: 13,
    name: "Driver Docs",
    cell: (row) => (
      <a
        href={MEDIA_URL + row.DriverDocs}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Driver Docs
      </a>
    ),
    sortable: true,
    reorder: true,
  },

  {
    id: 14,
    name: "Created Date",
    cell: (row) => (row.createdAt ? row.createdAt : row.createdAt),
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 15,
    name: "Updated Date",
    cell: (row) => (row.updatedAt ? row.updatedAt : row.updatedAt),
    sortable: true,
    right: true,
    reorder: true,
  },
];
