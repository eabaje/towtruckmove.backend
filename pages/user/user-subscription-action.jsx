import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import AddEditUserSubscription from "../../components/form/user/AddEditUserSubscription";

function AddUserSubscription({query}) {
  // const router = useRouter()
  // const {
  //   query
  // } = router
 

  useEffect(() => {
  

  }, []);
 
  return (
    <>
    <MainLayout>
      <AddEditUserSubscription query={query} />
      </MainLayout>
    </>
  );
}
//Login.layout = "main";
//export default AddUserSubscription;
export async function getServerSideProps({ query }) {
  
  return {
    props: { query },
  };

 
}

export default dynamic(() => Promise.resolve(AddUserSubscription), { ssr: false });
