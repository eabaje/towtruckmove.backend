import React, { useState, useContext, useEffect } from "react";
import { columns } from "../../datasource/dataColumns/user";
import { GlobalContext } from "../../context/Provider";
import { listUsers } from "../../context/actions/user/user.action";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";
import NextLink from "next/link";

function UserList({ query }) {
  // const router = useRouter()
  const { userId } = query;

  const isSingleMode = !userId;

  const [data2, setData] = useState([]);

  const {
    authState: { user },
  } = useContext(GlobalContext);
  const {
    userDispatch,

    userState: {
      Users: { data, loading }, //loading
    },
  } = useContext(GlobalContext);

  const loadData = () => {
    if (data.length === 0) {
      listUsers()(userDispatch)((res) => {
        setData(res.data);
      })((err) => {
        toast.error(err);
      });
    }
  };

  useEffect(() => {
    let controller = new AbortController();
    loadData();
    return () => controller?.abort();
  }, []);
  // console.log("user", data);
  return (
    <MainLayout>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header ">
            <h3>List of Users</h3>
            <hr />
            <ul className="alert alert-info">
              <li>Edit and delete Users</li>
              <li>Get an overview of all Users</li>
            </ul>
          </div>
          <div className="card-body table-border-style">
            <Datatable
              loading={loading}
              col={columns(user)}
              data={
                userId
                  ? data.data?.filter((item) => item?.UserId === userId)
                  : data?.data
              }
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
//Login.layout = "main";
//export default UserList;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(UserList), { ssr: true });
