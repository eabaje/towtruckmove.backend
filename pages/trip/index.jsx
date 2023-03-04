import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { columns } from "../../datasource/dataColumns/trip";
import { ChevronsDown } from "react-feather";
import { GlobalContext } from "../../context/Provider";
import { listTrips } from "../../context/actions/trip/trip.action";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/datatable-m";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { API_URL } from "../../constants";

function ListTrip({ query }) {
  const router = useRouter();
  const { userId, shipmentId, sent, companyId } = query;
  const {
    authState: { user },
  } = useContext(GlobalContext);
  const {
    tripDispatch,
    tripState: {
      Trips: { data, loading }, //loading
    },
  } = useContext(GlobalContext);
  const loadData = () => {
    // userId
    //   ? listShipments()(shipmentDispatch)((result) => {})((err) => {
    //     enqueueSnackbar(err, { variant: "error" });
    //   })
    //   : listShipments()(shipmentDispatch)((result) => {})((err) => {
    //     enqueueSnackbar(err, { variant: "error" });
    //   });

    listTrips()(tripDispatch)((result) => {})((err) => {
      toast.error(err);
    });
    // setData(data.data?.filter((item) => item.UserId === userId));
  };
  // Calling the function on component mount
  useEffect(() => {
    if (data.length === 0) {
      loadData();
    }
  }, []);

  return (
    <MainLayout>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header ">
            <h3>List of Trips made</h3>
            <ul className="alert alert-info">
              <li>Edit and delete Trips</li>
              <li>Get an overview of all trips</li>
              <li>Add Rating</li>
            </ul>

            {user.roles === "driver" && user.roles === "carrier" && (
              <h1 className="my-5">
                <NextLink href="/trip/trip-action/" passHref>
                  <a className="mt-0 btn text-white float-right btn-success">
                    Create Trip Info
                  </a>
                </NextLink>{" "}
              </h1>
            )}
          </div>
          <div className="card-body table-border-style">
            <Datatable
              loading={loading}
              col={columns(user)}
              data={data?.data?.filter(
                (item) => item?.ShipmentId === shipmentId
              )}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
//Login.layout = "main";

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(ListTrip), { ssr: false });
