import React, { useState, useContext, useCallback, useEffect } from "react";
import { ChevronsDown, Edit, Trash, User } from "react-feather";
import { useRouter } from "next/router";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import {
  listVehicles,
  listVehiclesByCarrier,
  listVehiclesByCompany,
} from "../../context/actions/vehicle/vehicle.action";
import { GlobalContext } from "../../context/Provider";
import { columns } from "../../datasource/dataColumns/vehicle";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";
import NextLink from "next/link";

function ListVehicle({ query }) {
  //const router = useRouter()
  const { companyId, vehicleId, carrierId, carrierType } = query;

  const isAddMode = !vehicleId;

  const [data2, setData] = useState([]);

  const {
    authState: { user },
  } = useContext(GlobalContext);

  const {
    vehicleDispatch,
    vehicleState: {
      Vehicles: { data, error, loading },
    },
  } = useContext(GlobalContext);

  // Calling the function on component mount
  useEffect(() => {
    if (data.length === 0) {
      if (carrierType) {
        listVehiclesByCarrier(carrierId, carrierType)(vehicleDispatch);
        // listVehicles()(vehicleDispatch);
      } else if (companyId) {
        listVehiclesByCompany(companyId)(vehicleDispatch)((res) => {})(
          (err) => {
            toast.error(err);
          }
        );
      } else {
        listVehicles()(vehicleDispatch);
      }
    }
  }, []);
  console.log(`data`, data);

  return (
    <MainLayout>
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h3>List of Vehicles</h3>
            <hr />
            <ul>
              <li>Edit and delete Vehicles</li>
              <li>Assign Vehicle to Drivers</li>
              <li>Add vehicles to Carrier </li>
            </ul>
            <h1 className="my-5">
              <NextLink href="/vehicle/vehicle-action/" passHref>
                <a className="mt-0 btn text-white float-right btn  btn-primary">
                  Create Vehicle Info
                </a>
              </NextLink>
            </h1>
          </div>
          <div className="card-body table-border-style">
            <Datatable loading={loading} col={columns(user)} data={data.data} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
//Login.layout = "main";
//export default ListVehicle;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(ListVehicle), { ssr: false });
