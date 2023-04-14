import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { columns } from "../../datasource/dataColumns/company";
import { GlobalContext } from "../../context/Provider";

import LoadingBox from "../../components/notification/loadingbox";
import {
  listCompanyByCompanyId,
  listCompanys,
} from "../../context/actions/user/user.action";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";

function ListCompany({ query }) {
  const router = useRouter();
  const { companyId, companyType } = query;

  const [data2, setData] = useState([]);

  const {
    authState: { user },
  } = useContext(GlobalContext);
  const {
    userDispatch,
    userState: {
      Companys: { data, loading },
    },
  } = useContext(GlobalContext);

  const loadData = () => {
    if (data.length === 0) {
      listCompanys()(userDispatch)((res) => {})((err) => {
        toast.error(err);
      });
    }
  };
  // Calling the function on component mount
  useEffect(() => {
    let controller = new AbortController();
    loadData();
    return () => controller?.abort();
  }, []);

  const tableData = {
    columns,
    data2,
  };
  return (
    <>
      <MainLayout>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header alert alert-info">
              <h4>View List of Company</h4>
              <ul>
                <li>Search Company</li>
              </ul>
            </div>
            <Datatable
              loading={loading}
              col={columns(user)}
              data={
                companyId
                  ? data.data?.filter(
                      (item) => item?.CompanyId === parseInt(companyId)
                    )
                  : companyType
                  ? data.data?.filter(
                      (item) => item?.CompanyType === companyType
                    )
                  : data?.data
              }
            />
          </div>
        </div>
      </MainLayout>
    </>
  );
}

//export default ListCompany;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(ListCompany), { ssr: false });
