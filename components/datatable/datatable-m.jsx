import React from 'react'
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Camera, Trash, Truck, List, Edit, ChevronsDown } from "react-feather";
import "react-data-table-component-extensions/dist/index.css";
import LoadingBox from '../notification/loadingbox';
const Datatable = ({loading,col,data}) => {
  return (
    <div className="card-body table-border-style">
          <div className="table-responsive">
            {/* <DataTableExtensions {...tableData}> */}

            {loading ? (
              <LoadingBox />
            ) : (
              <DataTableExtensions
                exportHeaders
                columns={col}
                data={data}>
                <DataTable
                  columns={col}
                  data={data}
                  
                 
                  className="table table-striped table-bordered table-hover table-checkable"
                  defaultSortField={1}
                  sortIcon={<ChevronsDown />}
                  defaultSortAsc={true}
                  pagination
                  highlightOnHover
                />
              </DataTableExtensions>
            )}
          </div>
        </div>
  )
}

export default Datatable