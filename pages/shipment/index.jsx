import React, { useState, useContext, useEffect } from "react";

import { useRouter } from "next/router";
import { columns } from "../../datasource/dataColumns/shipment";
import { GlobalContext } from "../../context/Provider";
import { listShipments } from "../../context/actions/shipment/shipment.action";
import { useForm, Controller } from "react-hook-form";

import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import axios from "axios";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { API_URL } from "../../constants";
import ChatBox from "../../components/chat/ChatBox";
import CustomPopup from "../../components/popup/popup.component";
import { PopUpClose } from "../../context/actions/user/user.action";
import CustomButton from "../../components/button/customButton";
import CustomModal from "../../components/popup/modal.component";
import BackDropModal from "../../components/popup/modal.animated";
import { MyBackDrop } from "../../components/popup/backdrop.modal";

function ListShipment({ query }) {
  const router = useRouter();
  const { userId, role, sent, companyId } = query;

  const [data2, setData] = useState([]);
  // const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

  const [shipmentName, setshipmentName] = useState("");
  const [chatUser, setChatUser] = useState({
    FromUser: null,
    ToUser: null,
  });
  const [interest, setInterest] = useState({
    showInterest: false,
    CompanyId: null,
    ShipmentId: null,
    UserId: null,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  //const open = () => setModalOpen(true);

  const [isOpen, setIsOpen] = useState(false);
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

  const [action, setAction] = useState({
    showInterestAction: showInterestAction,
    dispatchShipmentAction: dispatchShipmentAction,
    pickedUpShipmentAction: pickedUpShipmentAction,
    deliveredShipmentAction: deliveredShipmentAction,
    cancelShipmentAction: cancelShipmentAction,
    archiveShipmentAction: archiveShipmentAction,
    sendRemindEmailAction: sendRemindEmailAction,
    contractSignedAction: contractSignedAction,
    contractAcceptedAction: contractAcceptedAction,
  });
  const [shipmentId, setshipmentId] = useState("");
  const {
    authState: { user },
    userDispatch,
    userState: { popUpOverLay: open },
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

  const popupCloseHandler = (e) => {
    // PopUpClose()(userDispatch);
    // setVisibility(e);
    !interest.showInterest;
  };

  const {
    register: registerInterest,
    formState: { errors },
    handleSubmit: handleInterest,
    setValue,
    control,
  } = useForm();

  const showInterestAction = (shipmentId, companyId, userId) => {
    //  e.preventDefault();
    setInterest({
      showInterest: true,
      CompanyId: companyId,
      ShipmentId: shipmentId,
      UserId: userId,
    });
  };

  const showInterestFormAction = async (formdata) => {
    setLoadSpinner({ loadInterest: false });

    try {
      setLoadSpinner({ loadInterest: true });
      const res = await axios.post(`${API_URL}shipment/showInterest`, formdata);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner({ loadInterest: false });

        redirectPage();
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner({ loadInterest: false });
    }
  };

  const dispatchShipmentAction = async (shipmentId, companyId, userId) => {
    setLoadSpinner({ loadDispatch: true });
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/dispatchShipment`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner({ loadDispatch: false });
        redirectPage();
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner({ loadDispatch: false });
    }
  };

  const pickedUpShipmentAction = async (
    shipmentId,
    companyId,
    userId,
    roles
  ) => {
    setLoadSpinner({ loadPickedUp: true });
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
      Role: roles,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/pickedUpShipment`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner({ loadPickedUp: false });
        redirectPage();
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner({ loadPickedUp: false });
    }
  };

  const deliveredShipmentAction = async (
    shipmentId,
    companyId,
    userId,
    roles
  ) => {
    setLoadSpinner({ loadDelivered: true });
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
      Role: roles,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(
        `${API_URL}shipment/deliveredShipment`,
        data
      );

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner({ loadDelivered: false });
        redirectPage();
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner({ loadDelivered: false });
    }
  };

  const cancelShipmentAction = async (shipmentId, companyId, userId) => {
    setLoadSpinner({ loadCancel: true });
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/cancelShipment`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner({ loadCancel: false });
        redirectPage();
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner({ loadCancel: false });
    }
  };

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

  const sendRemindEmailAction = async (shipmentId, companyId, userId) => {
    setLoadSpinner({ loadRemind: true });
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/sendRemindEmail`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner({ loadRemind: false });
        redirectPage();
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner({ loadRemind: false });
    }
  };

  const contractSignedAction = async (shipmentId, companyId, userId) => {
    setLoadSpinner({ loadSigned: true });
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
      Role: user?.roles,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/contractSigned`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner({ loadSigned: false });
        redirectPage();
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner({ loadSigned: false });
    }
  };

  const contractAcceptedAction = async (shipmentId, companyId, userId) => {
    setLoadSpinner({ loadAccepted: true });
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/contractAccepted`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner({ loadAccepted: false });
        redirectPage();
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner({ loadAccepted: false });
    }
  };

  const chatAction = async (shipmentId, from, role) => {
    console.log("from", from);
    try {
      if (role === "shipper") {
        const res = await axios.get(
          `${API_URL}shipment/findAssignDriverShipment/${shipmentId}`
        );

        if (res) {
          setChatUser({
            ToUser: res.data?.data?.Driver?.DriverName,
            FromUser: from,
          });
          setIsOpen(true);
        }
      } else {
        const res = await axios.get(`${API_URL}shipment/findOne/${shipmentId}`);

        setChatUser({
          ToUser: res.data?.data?.User?.FullName,
          FromUser: from,
        });
        setIsOpen(true);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const loadData = () => {
    // listShipments()(shipmentDispatch)((result) => {})((err) => {
    //   toast.error(err);

    // });
    userId
      ? listShipments()(shipmentDispatch)((result) => {})((err) => {
          toast.error(err);
        })
      : listShipments()(shipmentDispatch)((result) => {})((err) => {
          toast.error(err);
        });

    //  setData(data.data?.filter((item) => item.UserId === userId));
  };

  useEffect(() => {
    if (data.length === 0) {
      loadData();
    }
    //  setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  console.log(`data`, chatUser);
  console.log("interest", interest.showInterest);
  return (
    <MainLayout>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h3>List of Shipments</h3>

            {user?.roles === "shipper" && (
              <h1 className="my-5">
                <NextLink href="/shipment/shipment-action/" passHref>
                  <a className="mt-0 btn text-white float-right btn  btn-primary">
                    Create Shipment Info
                  </a>
                </NextLink>
              </h1>
            )}
          </div>
          <div className="card-body table-border-style">
            <div class="card-body">
              <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active text-uppercase"
                    id="Listing-tab"
                    data-toggle="tab"
                    href="#Listing"
                    role="tab"
                    aria-controls="Listing"
                    aria-selected="true"
                  >
                    Listing (
                    {userId
                      ? data.data?.filter(
                          (item) =>
                            item?.UserId === userId &&
                            item?.IsArchived === false &&
                            item?.ShipmentStatus === "NotAssigned"
                        ).length
                      : data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.ShipmentStatus === "NotAssigned"
                        ).length}
                    )
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-uppercase"
                    id="Assigned-tab"
                    data-toggle="tab"
                    href="#Assigned"
                    role="tab"
                    aria-controls="Assigned"
                    aria-selected="false"
                  >
                    Assigned (
                    {userId
                      ? data.data?.filter(
                          (item) =>
                            item?.UserId === userId &&
                            item?.IsArchived === false &&
                            item?.ShipmentStatus === "Assigned"
                        ).length
                      : role
                      ? data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.ShipmentStatus === "Assigned"
                        ).length
                      : data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.ShipmentStatus === "Assigned" &&
                            item?.AssignedCarrier === parseInt(companyId)
                        ).length}
                    )
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-uppercase"
                    id="Dispatched-tab"
                    data-toggle="tab"
                    href="#Dispatched"
                    role="tab"
                    aria-controls="Dispatched"
                    aria-selected="false"
                  >
                    Dispatched (
                    {userId
                      ? data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.UserId === userId &&
                            item?.ShipmentStatus === "Dispatched"
                        ).length
                      : role
                      ? data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.ShipmentStatus === "Dispatched"
                        ).length
                      : data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.AssignedCarrier === parseInt(companyId) &&
                            item?.ShipmentStatus === "Dispatched"
                        ).length}
                    )
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-uppercase"
                    id="PickedUp-tab"
                    data-toggle="tab"
                    href="#PickedUp"
                    role="tab"
                    aria-controls="PickedUp"
                    aria-selected="false"
                  >
                    Picked Up (
                    {userId
                      ? data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.UserId === userId &&
                            item?.ShipmentStatus === "PickedUp"
                        ).length
                      : role
                      ? data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.ShipmentStatus === "PickedUp"
                        ).length
                      : data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.AssignedCarrier === parseInt(companyId) &&
                            item?.ShipmentStatus === "PickedUp"
                        ).length}
                    )
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-uppercase"
                    id="Delivered-tab"
                    data-toggle="tab"
                    href="#Delivered"
                    role="tab"
                    aria-controls="Delivered"
                    aria-selected="false"
                  >
                    Delivered (
                    {userId
                      ? data.data?.filter(
                          (item) =>
                            item?.UserId === userId &&
                            item?.IsArchived === false &&
                            item?.ShipmentStatus === "Delivered"
                        ).length
                      : role
                      ? data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.ShipmentStatus === "Delivered"
                        ).length
                      : data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.AssignedCarrier === parseInt(companyId) &&
                            item?.ShipmentStatus === "Delivered"
                        ).length}
                    )
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-uppercase"
                    id="Cancelled-tab"
                    data-toggle="tab"
                    href="#Cancelled"
                    role="tab"
                    aria-controls="Cancelled"
                    aria-selected="false"
                  >
                    Cancelled (
                    {userId
                      ? data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.UserId === userId &&
                            item?.ShipmentStatus === "Cancelled"
                        ).length
                      : role
                      ? data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.ShipmentStatus === "Cancelled"
                        ).length
                      : data.data?.filter(
                          (item) =>
                            item?.IsArchived === false &&
                            item?.AssignedCarrier === parseInt(companyId) &&
                            item?.ShipmentStatus === "Cancelled"
                        ).length}
                    )
                  </a>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="Listing"
                  role="tabpanel"
                  aria-labelledby="Listing-tab"
                >
                  <div class="mb-0">
                    <p>
                      These vehicles are listed on Load Dispatch and are not yet
                      assigned to a carrier.{" "}
                      {user?.roles === "shipper" && (
                        <>
                          Once you have found a carrier to move your vehicle,
                          your next step is to "Assign" it to them so that they
                          can sign your dispatch sheet and contract. If you
                          don't see your vehicle listed here, you must first
                          create it using{" "}
                          <a href="/shipment/shipment-action">Post Shipment</a>.
                        </>
                      )}
                    </p>

                    <hr />

                    {/* <div class="row">
                      <div class="col-lg-6 col-md-7 col-sm-8 margin-bottom-10">
                        <form id="searchForm" class="form-inline">
                          <div class="form-group">
                            <label for="exampleInputName2">
                              Search<span class="hidden-sm"> for</span>
                            </label>
                            <select name="searchIn" class="form-control">
                              <option value="origination_city">
                                Pickup City
                              </option>
                              <option value="origination_state">
                                Pickup State
                              </option>
                              <option value="destination_city">
                                Delivery City
                              </option>
                              <option value="destination_state">
                                Delivery State
                              </option>
                              <option value="order_id">Order ID</option>
                              <option value="vehicle_make">Vehicles</option>
                              <option value="carrier_company">
                                Carrier Name
                              </option>
                            </select>
                          </div>
                        </form>
                      </div>
                    </div> */}
                    <Datatable
                      loading={loading}
                      col={columns(
                        LoadSpinner,
                        user,
                        showInterestAction,
                        archiveShipmentAction
                      )}
                      data={
                        userId
                          ? data.data?.filter(
                              (item) =>
                                item?.UserId === userId &&
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "NotAssigned"
                            )
                          : data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "NotAssigned"
                            )
                      }
                    />
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="Assigned"
                  role="tabpanel"
                  aria-labelledby="Assigned-tab"
                >
                  <div class="mb-0">
                    <p>
                      Your requests to move these vehicles have been emailed to
                      the assigned carrier and have been placed in the
                      respective carrier's Load Dispatch account. You are
                      waiting for these carriers to sign the dispatch sheet and
                      contract. If the carrier has not responded in a reasonable
                      amount of time you may send them a reminder email taking
                      the "Remind" action.
                    </p>

                    <Datatable
                      loading={loading}
                      col={columns(
                        LoadSpinner,
                        user,
                        dispatchShipmentAction,
                        archiveShipmentAction,
                        sendRemindEmailAction,
                        contractSignedAction,
                        contractAcceptedAction
                      )}
                      data={
                        userId
                          ? data.data?.filter(
                              (item) =>
                                item?.UserId === userId &&
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Assigned"
                            )
                          : role
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Assigned"
                            )
                          : data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Assigned" &&
                                item?.AssignedCarrier === parseInt(companyId)
                            )
                      }
                    />
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="Dispatched"
                  role="tabpanel"
                  aria-labelledby="Dispatched-tab"
                >
                  <div class="mb-0">
                    <p>
                      These orders have been electronically signed by their
                      assigned carriers and are awaiting pick-up. Either you or
                      the carrier may mark the order as "Picked-Up" once the
                      carrier has loaded your vehicle(s) on its truck.
                    </p>

                    <Datatable
                      loading={loading}
                      col={columns(
                        LoadSpinner,
                        user,
                        pickedUpShipmentAction,
                        archiveShipmentAction
                      )}
                      data={
                        userId
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.UserId === userId &&
                                item?.ShipmentStatus === "Dispatched"
                            )
                          : role
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Dispatched"
                            )
                          : data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.AssignedCarrier === parseInt(companyId) &&
                                item?.ShipmentStatus === "Dispatched"
                            )
                      }
                    />
                  </div>
                </div>

                <div
                  class="tab-pane fade"
                  id="PickedUp"
                  role="tabpanel"
                  aria-labelledby="PickedUp-tab"
                >
                  <div class="mb-0">
                    <p>
                      These vehicles have been picked up by their assigned
                      carriers and are in transport. Either you or the carrier
                      may mark the order as "Delivered" once the carrier has
                      delivered the vehicle(s) to their final destination.
                    </p>

                    <Datatable
                      loading={loading}
                      col={columns(
                        LoadSpinner,
                        user,
                        deliveredShipmentAction,
                        archiveShipmentAction
                      )}
                      data={
                        userId
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.UserId === userId &&
                                item?.ShipmentStatus === "PickedUp"
                            )
                          : role
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "PickedUp"
                            )
                          : data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.AssignedCarrier === parseInt(companyId) &&
                                item?.ShipmentStatus === "PickedUp"
                            )
                      }
                    />
                  </div>
                </div>

                <div
                  class="tab-pane fade"
                  id="Delivered"
                  role="tabpanel"
                  aria-labelledby="Delivered-tab"
                >
                  <div class="mb-0">
                    <p>
                      These orders have been delivered and the transaction has
                      been completed. If you have a similar listing, you may
                      copy the vehicles of an order to Central Dispatch using
                      the "copy to CD" action, but the order will always remain
                      in the "Delivered" tab until it has been archived. To
                      reduce the number of records in this tab, you may move
                      these orders into the "Archived" tab by taking the
                      "Archive" action next to the order.
                    </p>

                    <Datatable
                      loading={loading}
                      col={columns(
                        LoadSpinner,
                        user,
                        deliveredShipmentAction,
                        archiveShipmentAction,
                        chatAction
                      )}
                      data={
                        userId
                          ? data.data?.filter(
                              (item) =>
                                item?.UserId === userId &&
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Delivered"
                            )
                          : role
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Delivered"
                            )
                          : data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.AssignedCarrier === parseInt(companyId) &&
                                item?.ShipmentStatus === "Delivered"
                            )
                      }
                    />
                  </div>
                </div>

                <div
                  class="tab-pane fade"
                  id="Cancelled"
                  role="tabpanel"
                  aria-labelledby="Cancelled-tab"
                >
                  <div class="mb-0">
                    <p>
                      These orders are requests that were declined by the
                      carrier, withdrawn by the company, or cancelled by either
                      party after the order had been signed. New listings or
                      requests may be created from a cancelled order, but the
                      order will always remain in the "Cancelled" tab until it
                      has been archived. To reduce the number of records in this
                      tab, you may move these orders into the "Archived" tab by
                      taking the "Archive" action next to the order.
                    </p>
                    <Datatable
                      loading={loading}
                      col={columns(
                        LoadSpinner,
                        user,
                        showInterestAction,
                        archiveShipmentAction
                      )}
                      data={
                        userId
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.UserId === userId &&
                                item?.ShipmentStatus === "Cancelled"
                            )
                          : role
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Cancelled"
                            )
                          : data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.AssignedCarrier === parseInt(companyId) &&
                                item?.ShipmentStatus === "Cancelled"
                            )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ChatBox
          isOpen={isOpen}
          fromUser={chatUser.FromUser}
          toUser={chatUser.ToUser}
        />
      </div>
      {interest.showInterest === true && (
        //<BackDropModal handleClose={() => setModalOpen(false)}></BackDropModal>
        <CustomPopup
          onClose={popupCloseHandler}
          show={interest.showInterest}
          width={"500px"}
          height={"300px"}
        >
          <form onSubmit={handleInterest(showInterestFormAction)}>
            <div className="col-md-10">
              <input
                type="hidden"
                name="CompanyId"
                className="form-control"
                {...registerInterest("CompanyId")}
              />
              <input
                type="hidden"
                name="ShipmentId"
                className="form-control"
                {...registerInterest("ShipmentId")}
              />
              <input
                type="hidden"
                name="UserId"
                className="form-control"
                {...registerInterest("UserId")}
              />

              <div className="form-group col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder="* Service Cost"
                  name="ServiceCost"
                  {...registerInterest("ServiceCost", {
                    required: true,
                  })}
                />
                {errors.CompanyName &&
                  errors.CompanyName.type === "required" &&
                  errorMessage(required)}
              </div>

              <div className="form-group"></div>

              <div className="form-row">
                <div className="col-sm-10 "></div>
                <div className="right" style={{ float: "right" }}>
                  <CustomButton
                    loading={LoadSpinner.loadInterest}
                    isAddMode={true}
                  />
                </div>
              </div>
            </div>
          </form>
        </CustomPopup>
      )}
    </MainLayout>
  );
}
//ListShipment.layout = "main";
//export default ListShipment;

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(ListShipment), { ssr: false });
