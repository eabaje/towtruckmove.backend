import MUIDataTable from "mui-datatables";
import React from "react";
import LoadingBox from "../notification/loadingbox";

export default function MuiDatatable({ props }) {
  return (
    <div className="card-body table-border-style">
      <div className="table-responsive">
        {/* <DataTableExtensions {...tableData}> */}

        {loading ? (
          <LoadingBox />
        ) : (
          <MUIDataTable
            title={props.title}
            data={props.data}
            columns={props.columns}
            options={props.options}
          />
        )}
      </div>
    </div>
  );
}
