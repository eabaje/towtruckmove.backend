import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import AddEditUser from "../../components/form/user/AddEditUser";
import dynamic from "next/dynamic";

function UserProfile({ query }) {
  // const router = useRouter()
  // const {
  //   query
  // } = router

  // const { query, isReady } = useRouter();

  // console.log("router", query);
  return (
    <MainLayout>
      <AddEditUser query={query} />
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
