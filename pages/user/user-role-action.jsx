import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import AddEditUserRole from "../../components/form/user/AddEditUserRole";
import dynamic from 'next/dynamic';

function AddUserRole({query}) {
  
  // const router = useRouter()
  // const {
  //   query
  // } = router
 

  
  
 

  return (
    <>
     <MainLayout>
        <AddEditUserRole query={query} />
        </MainLayout>
    </>
  );
}
//Login.layout = "main";
//export default AddUserRole;
export async function getServerSideProps({ query }) {
  
  return {
    props: { query },
  };

 
}

export default dynamic(() => Promise.resolve(AddUserRole), { ssr: false });