import React, { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router";

import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import AddEditDriver from "../../components/form/driver/AddEditDriver";
import dynamic from "next/dynamic";

const AddDriver = ({ query }) => {
  // const onSubmit = (data) => console.log(data);
  // const router = useRouter()
  // const {
  //   query
  // } = router

  // const {
  //   authState: { user },
  // } = useContext(GlobalContext)

  return (
    <>
      <MainLayout>
        <AddEditDriver query={query} />
      </MainLayout>
    </>
  );
};
//Login.layout = "main";
//export default AddDriver;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(AddDriver), { ssr: false });
