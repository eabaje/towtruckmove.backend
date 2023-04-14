import React, { useState, useContext, useEffect } from "react";

import { useRouter } from "next/router";

import { columns } from "../../datasource/dataColumns/carrier";
import { GlobalContext } from "../../context/Provider";
import {
  listCarriers,
  listCarriersByCompany,
} from "../../context/actions/carrier/carrier.action";
import dynamic from "next/dynamic";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import NextLink from "next/link";
import Datatable from "../../components/datatable/datatable-m";
// import "react-data-table-component-extensions/dist/index.css";
// import DataTable from "react-data-table-component";
// import DataTableExtensions from "react-data-table-component-extensions";

function ListCarrier({ query }) {
  const { companyId, name } = query;
  // const router = useRouter()
  // const {
  //   query:companyId
  // } = router

  const {
    authState: { user },
  } = useContext(GlobalContext);
  const {
    carrierDispatch,
    carrierState: {
      Carriers: { data, loading },
    },
  } = useContext(GlobalContext);

  // GET request function to your Mock API
  const loadData = () => {
    companyId
      ? listCarriersByCompany(companyId)(carrierDispatch)((res) => {
          // setData(res.data);
        })((err) => {
          toast.error(err);
        })
      : listCarriers()(carrierDispatch)((res) => {
          // setData(res.data);
        })((err) => {
          toast.error(err);
        });
  };
  // Calling the function on component mount
  useEffect(() => {
    if (data.length === 0) {
      loadData();
    }

    //  fetchData();
  }, []);
  // console.log(`data`, JSON.parse(localStorage.getItem("user")));
  return (
    <MainLayout>
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h4>View List of carriers</h4>
            <hr />
            <ul>
              <li>Edit and delete Vehicle</li>
              <li>Assign Drivers to Vehicle</li>
            </ul>

            {user.roles === "carrier" && (
              <h1 className="my-5">
                <NextLink href="/carrier/carrier-action/" passHref>
                  <a className="mt-0 btn text-white float-right btn  btn-primary">
                    Create Carrier Info
                  </a>
                </NextLink>
              </h1>
            )}
          </div>

          <Datatable
            loading={loading}
            col={columns(user)}
            data={
              companyId
                ? data?.data?.filter(
                    (item) => item?.CompanyId === parseInt(companyId)
                  )
                : name
                ? data?.data?.filter((item) =>
                    item?.Company?.CompanyName.includes(name)
                  )
                : data?.data
            }
          />
        </div>
      </div>
    </MainLayout>
  );
}
//Login.layout = "main";
//export default ListCarrier;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(ListCarrier), { ssr: false });
