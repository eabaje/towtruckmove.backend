import React, { useState, useEffect, useContext } from "react";

import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import AddEditVehicle from "../../components/form/vehicle/AddEditVehicle";
import { GlobalContext } from "../../context/Provider";
import dynamic from "next/dynamic";

function AddVehicle({ query }) {
  const {
    authState: { user },
  } = useContext(GlobalContext);

  //  const router = useRouter()
  //   const {
  //     query
  //   } = router

  useEffect(() => {}, []);
  //console.log('data', driverdata)
  return (
    <MainLayout>
      <AddEditVehicle query={query} />
    </MainLayout>
  );
}
//Login.layout = "main";
//export default AddVehicle;

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(AddVehicle), { ssr: false });
