import  Link  from "react-router-dom";
import { Country, State } from "country-state-city";

export const columns = (params) => [
  {
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (row) => [
      <>
        {" "}
        <Link
          to={"/edit-driver-info/" + row.DriverId}
          className="btn btn-sm"
          title="Edit  Driver Info"
        >
          <i className="first fas fa-pen"></i>
        </Link>
      </>,

      <Link
        to={"/list-company-vehicles/" + row.CompanyId }
        className="btn btn-sm"
        title="Assign driver to vehicle"
      >
        <i className="first fas fa-car"></i>
      </Link>,
      params?.roles === "admin" && (
        <Link
          to={"/delete-data/Drivers/" + row.DriverId}
          className="btn btn-sm"
          title="Delete/Archive Redundant/Incorrect data"
        >
          <i className="fas fa-trash-alt"></i>
        </Link>
      ),
    ],
  },
  
  {
    id: 1,
    name: "Company",
    selector: (row) => row.Company?.CompanyName,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Driver Name",
    selector: (row) => row.DriverName,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: "Assigned Vehicle Number",
    selector: (row) =>  row?.Vehicles[0]['AssignDrivers'].Assigned===true? row?.Vehicles[0]['VehicleNumber']:"",
    sortable: true,
    reorder: true,
  },
  {
    id: 4,
    name: "Address",
    selector: (row) => row.Address,
    sortable: true,
    reorder: true,
  },

  {
    id: 5,
    name: "City",
    selector: (row) => row.City,
    sortable: true,
    reorder: true,
  },

  {
    id: 6,
    name: "Country",
    selector: (row) => row.Country? Country.getCountryByCode(row.Country).name: row.Country,
    sortable: true,
    reorder: true,
  },

  {
    id: 7,
    name: "Phone",
    selector: (row) => row.Phone,
    sortable: true,
    reorder: true,
  },

  {
    id: 8,
    name: "Email",
    selector: (row) => row.Email,
    sortable: true,
    reorder: true,
  },
  {
    id: 9,
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
    id: 10,
    name: "PicUrl",
    selector: (row) => row.PicUrl,
    sortable: true,
    reorder: true,
  },
  {
    id: 10,
    name: "License Url",
    selector: (row) => row.LicenseUrl,
    sortable: true,
    reorder: true,
  },
  {
    id: 10,
    name: "Rating",
    selector: (row) => row.Rating,
    sortable: true,
    reorder: true,
  },

  {
    id: 11,
    name: "Driver Docs",
    selector: (row) => row.DriverDocs,
    sortable: true,
    reorder: true,
  },

  {
    id: 12,
    name: "Created Date",
    selector: (row) => row.createdAt? Date.parse(row.createdAt):row.createdAt,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 13,
    name: "Updated Date",
    selector: (row) => row.updatedAt? Date.parse(row.updatedAt):row.updatedAt,
    sortable: true,
    right: true,
    reorder: true,
  },

 
];
