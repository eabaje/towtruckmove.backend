import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";

import { GlobalContext } from "../../context/Provider";

import { columns } from "../../datasource/dataColumns/subscribe";
import { listSubscriptions } from "../../context/actions/subscribe/subscribe.action";

import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/datatable-m";
import NextLink from "next/link";

function ListSubscription() {
  // const router = useRouter()
  // const {
  //   query:companyId
  // } = router
  const [data2, setData] = useState([]);

  // const [loading, setLoading] = useState(true);
  const {
    authState: { user },
  } = useContext(GlobalContext);

  const {
    subscribeDispatch,
    subscribeState: {
      Subscribes: { data, loading }, //loading
    },
  } = useContext(GlobalContext);

  // Calling the function on component mount

  // const getSubscription = useCallback(() => {
  //   listSubscriptions()(subscribeDispatch);
  // }, []);

  useEffect(() => {
    if (data.length === 0) {
      listSubscriptions()(subscribeDispatch);
      ((result) => {
        setData(result.data);
      })((err) => {
        toast.error(err);
      });
    }
  }, []);

  return (
    <MainLayout>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h3>List of Subscription</h3>
            <hr />
            <ul>
              <li>Edit and delete Subscription</li>
              <li>Get an overview of all Subscription</li>
            </ul>
            <h1 className="my-5">
              <NextLink href="/subscribe/subscription-action/" passHref>
                <a className="mt-0 btn text-white float-right btn  btn-primary">
                  Create Subscription Info
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
//ListSubscription.layout = "main";
export default ListSubscription;
