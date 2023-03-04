import {Form} from "react-bootstrap"
import  Link  from "next/link";
export const columns = (params) => [
  {
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (row) => [
      params?.roles === "carrier"  && (
        <Link
          href={
            "/user/user-subscription-action/?userSubscriptionId=" +
            row.UserSubscriptionId +
            "&userId=" +
            row.UserId
          }
         
        >
         <a  className="btn btn-sm"
          title="Edit User Subscription"> <i className="first fas fa-pen"></i></a>
        </Link>
      ),
      (params?.roles.toString() === "admin") && (
        <Link
           href={"/user/list-user-subscription/?subscribeId=" + row.UserSubscriptionId}
        
         
        >
        <a  className="btn btn-sm"  title="Edit User Subscription">   <i className="first fas fa-pen"></i></a>
        </Link>
      ),
     ( params?.roles.toString() === "admin") && (
        <Link
           href={"/delete-data/?tbl=UserSubscriptions&fld=UserSubscriptionId&val=" + row.UserSubscriptionId}
          
        >
        <a  className="btn btn-sm"  title="Delete User Subscription">  <i className="fas fa-trash-alt"></i></a> 
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
    name: "User",
    selector: (row) => row.User.FullName + "" + params?.roles,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
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
    id: 4,
    name: "Start Date",
    selector: (row) => row.StartDate,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 4,
    name: "End Date",
    selector: (row) => row.EndDate,
    sortable: true,
    right: true,
    reorder: true,
  },

 
];
