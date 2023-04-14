import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import ReviewCompany from "../../components/form/company/ReviewCompany";

function UserProfile({ query }) {
  // const router = useRouter()
  // const {
  //   query
  // } = router

  // const { query, isReady } = useRouter();

  console.log("router", query);
  return (
    <MainLayout>
      <ReviewCompany query={query} />
    </MainLayout>
  );
}
//Login.layout = "main";
//export default UserProfile;

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(UserProfile), { ssr: false });
