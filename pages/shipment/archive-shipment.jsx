import React, { useState, useContext, useEffect } from "react";
import { API_URL } from "../../constants";
import { columns } from "../../datasource/dataColumns/shipment";
import { GlobalContext } from "../../context/Provider";
import {
  listShipments,
  listShipmentsByUserId,
} from "../../context/actions/shipment/shipment.action";

import { useRouter } from "next/router";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import axios from "axios";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";

function ArchiveShipment({ query }) {
  const router = useRouter();
  const { companyId, userId, shipmentId } = query;
  const [data2, setData] = useState([]);

  const [show, setShow] = useState(false);

  const [shipmentName, setshipmentName] = useState("");
  const [LoadSpinner, setLoadSpinner] = useState({
    loadInterest: false,
    loadListing: false,
    loadAssign: false,
    loadDispatch: false,
    loadPickedUp: false,
    loadDelivery: false,
    loadCancel: false,
    loadArchive: false,
    loadRemind: false,
    loadAccept: false,
  });
  // const [shipmentId, setshipmentId] = useState("");
  const {
    authState: { user },
  } = useContext(GlobalContext);
  const {
    shipmentDispatch,
    shipmentState: {
      Shipments: { data, loading },
    },
  } = useContext(GlobalContext);
  // Calling the function on component mount
  function handleModal(params) {
    setshipmentName(params.shipmentName);
    setshipmentId(params.shipmentId);
    setShow(!show);
  }

  function redirectPage() {
    setTimeout(() => {
      toast.dismiss();
      user.roles === "carrier"
        ? router.reload(`/shipment/?companyId=${user.CompanyId}`)
        : user.roles === "shipper"
        ? router.reload(`/shipment/?userId=${user.UserId}`)
        : router.reload(`/shipment/?companyId=${user.CompanyId}`);
    }, 5000);
  }

  const archiveShipmentAction = async (shipmentId) => {
    setLoadSpinner({ loadArchive: true });
    const data = {
      ShipmentId: shipmentId,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/archiveShipment`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner({ loadArchive: false });
        redirectPage();
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner({ loadArchive: false });
    }
  };

  const loadData = () => {
    // listShipments()(shipmentDispatch)((result) => {})((err) => {
    //   toast.error(err);

    // });
    userId
      ? listShipmentsByUserId(userId)(shipmentDispatch)((result) => {})(
          (err) => {
            toast.error(err);
          }
        )
      : listShipments()(shipmentDispatch)((result) => {})((err) => {
          toast.error(err);
        });

    //  setData(data.data?.filter((item) => item.UserId === userId));
  };

  useEffect(() => {
    if (data.length === 0) {
      loadData();
    }
  }, []);
  console.log("data2", data);
  return (
    <MainLayout>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h3>List of Archived Shipments </h3>
            <hr />
          </div>
          <div className="card-body table-border-style">
            <Datatable
              loading={loading}
              col={columns(LoadSpinner, user, null, archiveShipmentAction)}
              data={
                userId
                  ? data.data?.filter(
                      (item) =>
                        item?.UserId === userId && item?.IsArchived === true
                    )
                  : data.data?.filter(
                      (item) =>
                        item?.IsArchived === true &&
                        item?.CompanyId === companyId
                    )
              }
            />

            {/* <Modal show={show} onHide={() => handleModal()}>
              <Modal.Header closeButton>Check your interest</Modal.Header>
              <Modal.Body>{show}</Modal.Body>
              <Modal.Footer>
                <Button onClick={() => handleModal()}>Close</Button>
                <Button onClick={() => handleModal()}>Save</Button>
              </Modal.Footer>
            </Modal> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
//ListInterest.layout = "main";
//export default ListInterest;

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(ArchiveShipment), {
  ssr: false,
});
