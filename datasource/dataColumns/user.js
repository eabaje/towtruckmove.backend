import { Form } from "react-bootstrap";
import { Country, State } from "country-state-city";
import Link from "next/link";
export const columns = (params) => [
  {
    id: 14,
    key: 14,
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (row) => [
      params?.roles === "admin" && (
        <Link href={"/user/?userId=" + row["UserId"]}>
          <a className="btn btn-sm" title="Edit  User Info">
            {" "}
            <i className="first fas fa-pen"></i>
          </a>
        </Link>
      ),
      params?.roles === "admin" && (
        <>
          <Link
            href={
              "/company/review-company-action?companyId=" +
              row["Company"].CompanyId
            }
          >
            <a className="btn btn-sm" title="Reveiw Company Info">
              <i className="first fas fa-cog"></i>
            </a>
          </Link>
        </>
      ),
      params?.roles === "admin" && (
        <Link href={"/user/user-role-action/?userId=" + row["UserId"]}>
          <a className="btn btn-sm" title="Update User Role">
            <i className="first fas fa-user"></i>
          </a>
        </Link>
      ),
      params?.roles === "admin" && (
        <Link href={"/delete-data/?tbl=Users&fld=UserId&val=" + row["UserId"]}>
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
  {},
  {
    id: 1,
    key: 1,
    name: "FullName",
    selector: (row) => row["FullName"],
    sortable: true,
    reorder: true,
  },

  {
    id: 2,
    key: 2,
    name: "Company",
    selector: (row) => row["Company"].CompanyName,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    key: 3,
    name: "Contact Email",
    selector: (row) => row["Email"],
    sortable: true,
    reorder: true,
  },
  {
    id: 4,
    key: 4,
    name: "Contact Phone",
    selector: (row) => row["Phone"],
    sortable: true,
    reorder: true,
  },
  {
    id: 5,
    key: 5,
    name: "Address",
    selector: (row) => row["Address"],
    sortable: true,
    reorder: true,
  },

  {
    id: 6,
    key: 6,
    name: "IsActivated?",
    selector: (row) => (
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
    selector: (row) => (
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
    selector: (row) =>
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
    selector: (row) =>
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
    selector: (row) => row["PaymentMethod"],
    sortable: true,
    reorder: true,
  },

  {
    id: 11,
    key: 11,
    name: "Role",
    selector: (row) => row["Company"].CompanyType,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 12,
    key: 12,
    name: "Created Date",
    selector: (row) => row["createdAt"],
    sortable: true,
    right: true,
    reorder: true,
  },
  {
    id: 13,
    key: 13,
    name: "Updated Date",
    selector: (row) => row["updatedAt"],
    sortable: true,
    right: true,
    reorder: true,
  },
];
