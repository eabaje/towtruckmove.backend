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
          href={"/user/user-role-action/?roleId=" + row.RoleId}
         
        >
         <a  className="btn btn-sm"
          title="Edit  User Role"> <Edit size={12} /></a>
        </Link>
      </>,

      <Link
        href={"/user/user-role-action/?roleId=" + row.RoleId}
       
      >
        <a  className="btn btn-sm"
        title="Add User to Role"><i className="first fas fa-user"></i></a>
      </Link>,
      params?.roles === "admin" && (
        <Link
          href={"/delete-data/?tbl=Roles&fld=RoleId&val=" + row.RoleId}
        
        >
          <a   className="btn btn-sm"
          title="Delete/Archive Redundant/Incorrect data"><i className="fas fa-trash-alt"></i></a>
        </Link>
      ),
    ],
  },
  {
    id: 1,
    name: "RoleId",
    selector: (row) => row.RoleId,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Name",
    selector: (row) => row.Name,
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

 
];
