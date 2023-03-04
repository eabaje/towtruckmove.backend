import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../../context/Provider";
import {
  createSubscription,
  editSubscription,
  listSubscriptionsBySubscriptionId,
} from "../../../context/actions/subscribe/subscribe.action";
import { fetchData } from "../../../helpers/query";

import { toast } from "react-toastify";

const AddEditSubscription = ({ query }) => {
  const { subscribeId } = query;
  const isAddMode = !subscribeId;

  const [data, setData] = useState([]);

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
    subscribeDispatch,
    subscribeState: { createSubscribe: error, loading },
  } = useContext(GlobalContext);

  const getSubscriptionById = (id) => {
    //  e.preventDefault();

    return listSubscriptionsBySubscriptionId(id)(subscribeDispatch);
  };

  function onSubmit(formdata) {
    return isAddMode
      ? CreateSubscription(formdata)
      : updateSubscription(subscribeId, formdata);
  }

  function CreateSubscription(formdata) {
    createSubscription(formdata)(subscribeDispatch)((res) => {
      if (res) {
        toast.success(res.message);
      }
    })((err) => {
      toast.error(err);
    });
  }

  function updateSubscription(id, formdata) {
    editSubscription(id, formdata)(subscribeDispatch)((res) => {
      if (res) {
        toast.success(res.message);
      }
    })((err) => {
      toast.error(err);
    });
  }

  useEffect(() => {
    if (!isAddMode) {
      fetchData(
        "subscription/findOne",
        subscribeId
      )((subscription) => {
        console.log(`subscription`, subscribeId);
        const fields = [
          "SubscriptionType",
          "SubscriptionName",
          "Amount",
          "Description",
          "Active",
          "Duration",
        ];
        fields.forEach((field) => setValue(field, subscription[field]));
      })((err) => {
        toast.success(err.message);
      });
    }
  }, []);

  return (
    <>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h2>Subscription Form</h2>
          </div>
          <div className="card-body">
            <div className="col-md-12 ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="hidden"
                  name="UserId"
                  value={user.UserId}
                  className="form-control"
                />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    Subscription Type
                  </label>

                  <div className="col-sm-4">
                    <input
                      name="SubscriptionType"
                      className="form-control"
                      placeholder="Subscription Type "
                      {...register("SubscriptionType", {
                        required: true,
                      })}
                      required
                    />
                  </div>
                  <label className="col-sm-2 col-form-label">
                    Subscription Name
                  </label>

                  <div className="col-sm-4">
                    <input
                      name="SubscriptionName"
                      className="form-control"
                      placeholder="Subscription Name"
                      {...register("SubscriptionName", {
                        required: true,
                      })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Amount</label>
                  <div className="col-sm-2">
                    <input
                      name="Amount"
                      type="number"
                      className="form-control"
                      placeholder="Amount"
                      {...register("Amount")}
                      required
                    />
                  </div>

                  <label className="col-sm-2 col-form-label">Duration</label>
                  <div className="col-sm-2">
                    <input
                      name="Duration"
                      type="number"
                      className="form-control"
                      placeholder="Duration"
                      {...register("Duration")}
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

                <div className="form-group row">
                  <label className="col-form-label col-md-2">Description</label>
                  <div className="col-md-10">
                    {/* <Controller
                        as={<WYSIWYGEditor />}
                        name="editor_content"
                        control={control}
                      /> */}
                    <input
                      name="Description"
                      className="form-control"
                      placeholder="Description"
                      {...register("Description")}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <h5 className="alert alert-info"> </h5>
                  </div>
                </div>
                <div className="form-group"></div>

                <div className="form-row">
                  <div className="col-sm-10 ">
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
                  <div className="right" style={{ float: "right" }}>
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
                      {isAddMode ? "Submit" : "Update"}
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

export default AddEditSubscription;
