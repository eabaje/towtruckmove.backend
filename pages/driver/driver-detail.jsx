import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router"
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import DetailDriver from "../../components/form/carrier/DetailDriver";
import dynamic from 'next/dynamic'

function DriverDetail({query}) {
  // const router = useRouter()
  // const {
  //   query
  // } = router
 

 
  return (
    <>
    <MainLayout>
      <DetailDriver query={query} />
      </MainLayout>         
    </>
  );
}

//Login.layout = "main";
//export default DriverDetail;
export async function getServerSideProps({ query }) {
  
  return {
    props: { query },
  };

 
}

export default dynamic(() => Promise.resolve(DriverDetail), { ssr: false });