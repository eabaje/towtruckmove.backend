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
          href={"/trip/track-info/?trackId=" + row.TrackId}
         
        >
         <a className="btn btn-sm"
          title="Update Track Info"> <i className="first fas fa-pen"></i></a>
        </Link>
      </>,

      //   <Link
      //     to={"/add-vehicle-to-carrier/" + row.CarrierId}
      //     className="btn btn-sm"
      //     title="Assign Driver to Vehicle"
      //   >
      //     <i className="first fas fa-user"></i>
      //   </Link>,

      //   <Link
      //     to={"/delete-data/" + row.CarrierId}
      //     className="btn btn-sm"
      //     title="Delete/Archive Redundant/Incorrect data"
      //   >
      //     <i className="fas fa-trash-alt"></i>
      //   </Link>,
    ],
  },
  {
    id: 1,
    name: "Status",
    selector: (row) => row.Status,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "TrackNote",
    selector: (row) => row.TrackNote,
    sortable: true,
    reorder: true,
  },

  //   {
  //     id: 10,
  //     name: "AboutUs",
  //     selector: (row) => row.AboutUs,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 11,
  //     name: "Service Description",
  //     selector: (row) => row.ServiceDescription,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 5,
  //     name: "Rating",
  //     selector: (row) => row.Rating,
  //     sortable: true,
  //     reorder: true,
  //   },

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
