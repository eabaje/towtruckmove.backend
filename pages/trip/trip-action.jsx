import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "next/router";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import AddEditTrip from "../../components/form/trip/AddEditTrip";
import dynamic from 'next/dynamic';


function AddTrip({query}) {
 
  
  return (
    <>
    <MainLayout>
      <AddEditTrip query={query} />
    
    </MainLayout>
    </>
  );
}
//Login.layout = "main";
//export default AddTrip;
export async function getServerSideProps({ query }) {
  
  return {
    props: { query },
  };

 
}

export default dynamic(() => Promise.resolve(AddTrip), { ssr: false });

