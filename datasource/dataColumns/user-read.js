import { Form } from "react-bootstrap";
import { Country, State } from "country-state-city";
import Link from "next/link";
export const columns = (params) => [
  {
    id: 1,
    key: 1,
    name: "FullName",
    cell: (row) => row["FullName"],
    cell: (row) => [
      <>
        {" "}
        <Link
          href={
            "/driver/driver-action/?driverId=" +
            row?.DriverId +
            "&readOnly=true"
          }
        >
          <a className="btn-link" title="click to view driver details">
            {" "}
            {row?.FullName}{" "}
          </a>
        </Link>
      </>,
    ],
    sortable: true,
    reorder: true,
  },

  {
    id: 2,
    key: 2,
    name: "Company",
    cell: (row) => row["Company"].CompanyName,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    key: 3,
    name: "Contact Email",
    cell: (row) => row["Email"],
    sortable: true,
    reorder: true,
  },
  {
    id: 4,
    key: 4,
    name: "Contact Phone",
    cell: (row) => row["Phone"],
    sortable: true,
    reorder: true,
  },
  {
    id: 5,
    key: 5,
    name: "Address",
    cell: (row) => row["Address"],
    sortable: true,
    reorder: true,
  },

  {
    id: 6,
    key: 6,
    name: "IsActivated?",
    cell: (row) => (
      <Form.Check
        type="checkbox"
        id="custom-switch"
        checked={row["IsActivated"]}
        disabled
      />
    ),
    sortable: true,
    right: true,
    reorder: true,
  },
  {
    id: 7,
    key: 7,
    name: "AcceptTerms?",
    cell: (row) => (
      <Form.Check
        type="checkbox"
        id="custom-switch"
        checked={row["AcceptTerms"]}
        disabled
      />
    ),
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 8,
    key: 8,
    name: "Country",
    cell: (row) =>
      row["Country"]
        ? Country.getCountryByCode(row["Country"]).name
        : row["Country"],
    sortable: true,
    reorder: true,
  },
  {
    id: 9,
    key: 9,
    name: "Region",
    cell: (row) =>
      row?.Region
        ? State.getStateByCodeAndCountry(row?.Region, row?.Country)?.name
        : row?.Region,

    sortable: true,
    reorder: true,
  },
  {
    id: 10,
    key: 10,
    name: "Payment Method",
    cell: (row) => row["PaymentMethod"],
    sortable: true,
    reorder: true,
  },

  {
    id: 11,
    key: 11,
    name: "Role",
    cell: (row) => row["Company"].CompanyType,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 12,
    key: 12,
    name: "Created Date",
    cell: (row) => row["createdAt"],
    sortable: true,
    right: true,
    reorder: true,
  },
  {
    id: 13,
    key: 13,
    name: "Updated Date",
    cell: (row) => row["updatedAt"],
    sortable: true,
    right: true,
    reorder: true,
  },
];
