import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import React from "react";

import { useContext, useState } from "react";
import { GlobalContext } from "../context/Provider";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { signin2 } from "../context/actions/auth/auth.action";
import AuthLayout from "../layout/authLayout";
import dynamic from "next/dynamic";

function Login() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    authDispatch,
    authState: { isLoggedIn, loading },
  } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = React.useState(isLoggedIn);

  //console.log(`isAuthenticated`, isLoggedIn);

  // React.useEffect(() => {
  //   if (isLoggedIn) {
  //     history.push("/dashboard");
  //   }
  //   if (error) {
  //     enqueueSnackbar(error, { variant: "error" });
  //   }
  // }, [isLoggedIn, history]);

  const SubmitForm = (formdata) => {
    // e.preventDefault();
    //  console.log("state:", formdata);

    signin2(formdata)(authDispatch)((res) => {
      // res.user.isConfirmed === true
      //   ? res.user.isActivated === true
      //     ? router.push(`/dashboard/`)
      //     : res.user.roles === "carrier"
      //     ? (window.location.href = `/carrier/`)
      //     : res.user.roles === "shipper"
      //     ? (window.location.href = `/shipment/`)
      //     : (window.location.href = `/user/user-profile/?userId=${res.user.UserId}&companyId=${res.user.CompanyId}`)
      //   : (window.location.href = `/user/user-profile/?userId=${res.user.UserId}&companyId=${res.user.CompanyId}`);

      window.location.href = "/dashboard/";
      // history.push("/dashboard");
    })((err) => {
      console.log(`err`, err);
      toast.error(err);
    });
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(SubmitForm)}>
        <div className="form-group mb-3">
          {/* <label className="floating-label">Email address</label> */}
          <input
            type="text"
            className="form-control"
            placeholder="Email address"
            name="Email"
            {...register("Email", {
              required: true,
            })}
            required
          />
        </div>
        <div className="form-group mb-4">
          {/* <label className="floating-label">Password</label> */}
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="Password"
            {...register("Password")}
            required
          />
        </div>
        <div className="custom-control custom-checkbox text-left mb-4 mt-2">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label">Save credentials.</label>
        </div>
        <button className="btn btn-block btn-primary mb-4">
          {loading && <i classNameName="fa fa-spinner fa-spin"></i>} Signin
        </button>
        <p className="mb-2 text-muted">
          Forgot password?{" "}
          <a href="auth-reset-password.html" className="f-w-400">
            Reset
          </a>
        </p>
        <p className="mb-0 text-muted">
          Don’t have an account?{" "}
          <a href="   `" className="f-w-400">
            Signup
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}

//Login.layout = "auth";

//export default Login;
export default dynamic(() => Promise.resolve(Login), { ssr: false });
