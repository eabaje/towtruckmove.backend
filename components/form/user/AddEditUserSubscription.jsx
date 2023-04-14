import React, { useState, useEffect, useContext } from "react";
import { Controller, useForm, useController } from "react-hook-form";
import { GlobalContext } from "../../../context/Provider";
import { ORDER_STATUS } from "../../../constants/enum";

import { fetchData, fetchDataAll } from "../../../helpers/query";
import {
  subcribeUser,
  updateUserSubscription,
  upgradeUserSubscription,
} from "../../../context/actions/user/user.action";

import { usePaystackPayment } from "react-paystack";
import { Public_Key } from "../../../constants";
import { createPayment } from "../../../context/actions/payment/payment.action";

import { toast } from "react-toastify";

const AddEditUserSubscription = ({ query }) => {
  const { userSubscriptionId, userId, action } = query;

  const isAddMode = !userId;

  //initializePayment(onSuccess, onClose)

  const [subscribeUser, setSubscribeUser] = useState({});
  const [data, setData] = useState([]);
  const [subscriptionType, setsubscriptionType] = useState([]);
  const [subscriptionChange, setsubscriptionChange] = useState(false);
  const [amt, setAmt] = useState(0);
  const [emailvar, setEmailvar] = useState("");

  const [formPost, setFormPost] = useState({
    SubscriptionId: null,
    UserId: null,
  });
  const subscribeRef = React.useRef();
  const passwordRef = React.useRef();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    control,
  } = useForm({ mode: "onChange" });
  const {
    authState: { user },
  } = useContext(GlobalContext);
  const {
    userDispatch,
    userState: {
      createUserSubscription: { loading },
    },
    paymentDispatch,
    paymentState: {
      createPayment: {
        loading: { loading2 },
      },
    },
  } = useContext(GlobalContext);

  const onChangeSubcriptionHandler = async (e) => {
    if (isNaN(parseInt(e.target.value))) {
      return;
    }

    if (parseInt(e.target.value) === subscribeUser.SubscribeId) {
      setsubscriptionChange(false);

      // setAmt(0.0);
      getSubscriptionAmt(e.target.value);
      subscriptionChange === true || subscriptionChange(false);
    } else {
      subscriptionChange === false || setsubscriptionChange(true);
      setsubscriptionChange(true);
      getSubscriptionAmt(e.target.value);
      setFormPost({
        SubscriptionId: parseInt(e.target.value),
        UserId: subscribeUser?.UserId,
      });
    }
  };

  const config = {
    reference: new Date().getTime(),
    email: subscribeUser?.User?.Email,
    amount: amt * 100,
    publicKey: Public_Key,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    //log in payment
    const formPayment = {
      UserId: subscribeUser?.UserId,
      PaymentSessionId: reference.trans,
      ReferenceId: reference.reference,
      OrderStatus: ORDER_STATUS.find((item) => item.text === "Processed").value,
      PaymentMethod: subscribeUser.User?.PaymentMethod,

      TotalPrice: amt * 100,

      PaymentDate: new Date(),
    };

    createPayment(formPayment)(paymentDispatch)((res) => {
      //   console.log("formdata@CreatePayment", formPost);
      isAddMode
        ? createUserSubscription(formPost)
        : subscriptionChange
        ? UpgradeUserSubscription(formPost)
        : UpdateUserSubscription(userSubscriptionId, formPost);
    })((err) => {
      toast.error(err);
    });
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  function getSubscriptionAmt(subscribeId) {
    fetchData(
      "subscription/findOne",
      subscribeId
    )((Subscription) => {
      setAmt(Subscription.Amount);
    })((err) => {
      toast.error(err);
    });
  }

  function onSubmit(formdata) {
    // console.log("formdata", formdata);

    initializePayment(onSuccess, onClose);
  }

  function createUserSubscription(formdata) {
    subcribeUser(formdata)(userDispatch)((res) => {
      if (res) {
        toast.success(res.message);
      }
    })((err) => {
      toast.error(err);
    });
  }

  function UpgradeUserSubscription(formdata) {
    upgradeUserSubscription(formdata)(userDispatch)((res) => {
      if (res) {
        toast.success(res.message);
      }
    })((err) => {
      toast.error(err);
    });
  }

  function UpdateUserSubscription(id, formdata) {
    updateUserSubscription(formdata, id)(userDispatch)((res) => {
      if (res) {
        toast.success(res.message);
      }
    })((err) => {
      toast.error(err);
    });
  }

  useEffect(() => {
    let controller = new AbortController();

    if (!isAddMode) {
      fetchDataAll("subscription/findAll")((subscription) => {
        setsubscriptionType(subscription);
      })((err) => {
        toast.error(err);
      });

      fetchData(
        "user/findUserSubscription",
        userId
      )((userSubscription) => {
        setSubscribeUser(userSubscription);

        const fields = [
          "UserId",
          "SubscribeId",
          "StartDate",
          "Active",
          "EndDate",
        ];
        fields.forEach((field) => setValue(field, userSubscription[field]));
        getSubscriptionAmt(userSubscription.SubscribeId);
      })((err) => {
        toast.error(err);
      });
    }

    return () => controller?.abort();
  }, []);
  // console.log(`subscribeUser`, subscribeUser);
  // console.log("amt", amt);
  // pk_test_c06524a4666917095175d12761920ec03b4ebb35
  return (
    <>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h2>User Subscription Form</h2>
          </div>
          <div className="card-body">
            <div className="col-md-12 ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="hidden"
                  name="UserId"
                  value={subscribeUser?.UserId}
                  className="form-control"
                />
                <input
                  type="hidden"
                  name="Email"
                  value={subscribeUser?.User?.Email}
                  className="form-control"
                />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    Subscription Type
                  </label>

                  <div className="col-sm-4">
                    <select
                      id="SubscriptionType"
                      name="SubscriptionType"
                      className="form-control"
                      ref={subscribeRef}
                      {...register("SubscriptionType", {
                        required: true,
                      })}
                      required
                      onChange={(e) => onChangeSubcriptionHandler(e)}
                    >
                      <option selected>Select Subscription Type</option>

                      {subscriptionType.map((item) => (
                        <option
                          key={item?.SubscribeId}
                          selected={
                            subscribeUser?.SubscribeId === item?.SubscribeId
                          }
                          value={item?.SubscribeId}
                        >
                          {item?.SubscriptionName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="col-sm-2 col-form-label">Full Name</label>

                  <div className="col-sm-4">
                    <input
                      name="FullName"
                      className="form-control"
                      value={subscribeUser?.User?.FullName}
                      placeholder="User Name"
                      {...register("FullName", {
                        required: true,
                      })}
                      required
                    />
                  </div>
                </div>
                {subscriptionChange === true ? (
                  <></>
                ) : (
                  <>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">
                        Start Date
                      </label>
                      <div className="col-sm-2">
                        <input
                          name="StartDate"
                          type="text"
                          className="form-control"
                          placeholder="Start Date"
                          {...register("StartDate")}
                          required
                        />
                      </div>

                      <label className="col-sm-2 col-form-label">
                        End Date
                      </label>
                      <div className="col-sm-2">
                        <input
                          name="EndDate"
                          type="text"
                          className="form-control"
                          placeholder="End Date"
                          {...register("EndDate")}
                          required
                        />
                      </div>
                      {/* <div className="col-sm-2"> Active?</div> */}
                      <label className="col-sm-2 col-form-label">Active?</label>
                      <div className="col-md-2">
                        <div className="form-check">
                          <input
                            className="form-check-input-custom"
                            name="Active"
                            type="checkbox"
                            id="Active"
                            {...register("Active")}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="form-group row">
                  <div className="col-md-12">
                    <h5 className="alert alert-info"> </h5>
                  </div>
                </div>
                <div className="form-group"></div>

                <div className="form-row">
                  <div className="col-sm-8 ">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="IsValid"
                        value=""
                        id="invalidCheck"
                        required
                      />
                      <label className="form-check-label">
                        I confirm all information entered are accurate
                      </label>
                      <div className="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 right" style={{ float: "right" }}>
                    <button
                      type="submit"
                      className="btn  btn-primary"
                      style={{ float: "right" }}
                    >
                      {loading ? (
                        <i classNameName="fa fa-spinner fa-spin"></i>
                      ) : (
                        <i className="feather mr-2 icon-check-circle"></i>
                      )}{" "}
                      {isAddMode
                        ? "Submit"
                        : subscriptionChange
                        ? "Change Subscription"
                        : "Renew Subscription"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
//Login.layout = "main";

export default AddEditUserSubscription;
