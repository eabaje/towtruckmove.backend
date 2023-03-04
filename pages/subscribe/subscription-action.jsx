import React, { useEffect } from "react";

import MainLayout from "../../layout/mainLayout";

import AddEditSubscription from "../../components/form/subscribe/AddEditSubscription";
import dynamic from "next/dynamic";

function AddSubscription({ query }) {
  // const router = useRouter()
  // const {
  //   query
  // } = router

  const { subscribeId } = query;
  const isAddMode = !subscribeId;

  useEffect(() => {}, []);

  return (
    <>
      <MainLayout>
        <AddEditSubscription query={query} />
      </MainLayout>
    </>
  );
}
//AddSubscription.layout = "main";
//export default AddSubscription;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(AddSubscription), { ssr: false });
