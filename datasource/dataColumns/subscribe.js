import {Form} from "react-bootstrap"
import  Link  from "next/link";
export const columns = (params) => [
  {
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (row) => [
      <>
        {" "}
        <Link
          href={"/subscribe/subscription-action/?subscribeId=" + row.SubscribeId}
          
        >
         <a className="btn btn-sm"
          title="Edit  Subscription"> <i className="first fas fa-pen"></i></a>
        </Link>
      </>,

      <Link
        href={"/subscribe/"}
        
      >
        <a className="btn btn-sm"
        title="List All Users Subscribed"><i className="first fas fa-user"></i></a>
      </Link>,
      params?.roles === "admin" && (
        <Link
          to={"/delete-data/?tbl=Subscriptions&fld=SubscribeId&val=" + row.SubscribeId}
         
        >
         <a  className="btn btn-sm"
          title="Delete/Archive Redundant/Incorrect data"> <i className="fas fa-trash-alt"></i></a>
        </Link>
      ),
    ],
  },
  {
    id: 1,
    name: "Subscription Name",
    selector: (row) => row.SubscriptionName,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Subscription Type",
    selector: (row) => row.SubscriptionType,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: "Amount",
    selector: (row) => row.Amount,
    sortable: true,
    reorder: true,
  },
  {
    id: 4,
    name: "Description",
    selector: (row) => row.Description,
    sortable: true,
    reorder: true,
  },
  {
    id: 5,
    name: "Active",
    selector: (row) => (
      <Form.Check
        type="checkbox"
        id="custom-switch"
        checked={row.Active}
        disabled
      />
    ),
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 6,
    name: "Duration",
    selector: (row) => row.Duration,
    sortable: true,
    reorder: true,
  },
  {
    id: 7,
    name: "Created Date",
    selector: (row) => row.createdAt,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 8,
    name: "Updated Date",
    selector: (row) => row.updatedAt,
    sortable: true,
    right: true,
    reorder: true,
  },


];
