import { Form } from "react-bootstrap";
import { Edit } from "react-feather";
import Link from "next/link";
import { ROLES } from "../../constants/enum";
import { Country, State } from "country-state-city";
export const columns = (params) => [
  {
    id: 6,
    name: "Role Type",
    selector: (row) =>
      ROLES.find((item) => item.value === row.CompanyType).text,
    sortable: true,
    reorder: true,
  },
  {
    id: 7,
    name: "Specilaization",
    selector: (row) => row.Specialization,
    sortable: true,
    reorder: true,
  },

  {
    id: 1,
    name: "Company",

    sortable: true,
    reorder: true,

    cell: (row) => [
      <>
        {" "}
        <Link
          href={
            "/company/review-company-action/?companyId=" +
            row.CompanyId +
            "&readOnly=true"
          }
        >
          <a className="btn btn-sm" title="click to view company profile">
            {" "}
            {row?.CompanyName}{" "}
          </a>
        </Link>
      </>,
    ],
  },
  {
    id: 2,
    name: "Contact Email",
    selector: (row) => row.ContactEmail,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: "Contact Phone",
    selector: (row) => row.ContactPhone,
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
    id: 10,
    name: "Country",
    selector: (row) =>
      row.Country ? Country.getCountryByCode(row.Country).name : row.Country,
    sortable: true,
    reorder: true,
  },
  {
    id: 11,
    name: "Region",
    selector: (row) =>
      row.Region
        ? State.getStateByCodeAndCountry(row.Region, row.Country).name
        : row.Region,
    sortable: true,
    reorder: true,
  },
  {
    id: 5,
    name: "Company Type",
    selector: (row) => row.CompanyType,
    sortable: true,
    reorder: true,
  },

  {
    id: 12,
    name: "Created Date",
    selector: (row) => row.createdAt,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 13,
    name: "Updated Date",
    selector: (row) => row.updatedAt,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (row) => [
      params?.CompanyId === row.CompanyId && (
        <Link href={"/company/?companyId=" + row.CompanyId}>
          <a className="btn btn-sm" title="Edit  Company">
            {" "}
            <i className="first fas fa-pen"></i>
          </a>
        </Link>
      ),

      params?.roles === "admin" && (
        <Link href={"/company/?review=true&companyId=" + row.CompanyId}>
          <a className="btn btn-sm" title="Review Company Info">
            {" "}
            <i className="fas fa-wrench"></i>
          </a>
        </Link>
      ),
      params?.roles === "admin" && (
        <Link
          href={"/delete-data/?tbl=Companys&fld=CompanyId&val=" + row.CompanyId}
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
];
