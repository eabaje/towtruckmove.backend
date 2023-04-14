import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  CLEAR_AUTH_STATE,
} from "../../../constants/actionTypes";

import Axios from "axios";
import { API_URL } from "../../../constants";
import { CONNECTION_ERROR } from "../../../constants/api";
import axiosInstance from "../../../helpers/axiosInstance-2";

export const register =
  (form) => async (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      CompanyId: form.CompanyId || "",
      CarrierName: form.CarrierName || "",
      Email: form.Email || "",
      Phone: form.Phone || "",
      Address: form.Address || "",
      City: form.City || "",
      Country: form.Country || "",
      Licensed: form.Licensed || "",
      LicenseUrl: form.LicenseUrl || "",
      Rating: form.Rating || "",
      CarrierDocs: form.CarrierDocs || "",
      PicUrl: form.PicUrl || null,
    };

    dispatch({ type: REGISTER_REQUEST, payload: form });

    axiosInstance()
      .post("auth/register", form)
      .then((res) => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })

      .catch((err) => {
        const message = err.response
          ? err.response.data.message
          : { error: "Something went wrong, try agin" };
      });
  };

export const signin = (form, dispatch) => {
  const requestPayload = {
    Email: form.Email,
    Password: form.Password,
  };
  dispatch({ type: LOGIN_REQUEST, payload: requestPayload });
  try {
    const res = Axios.post(`${API_URL}auth/signin`, requestPayload);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
    //  console.log("res.data", res.data);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response ? error.response.data : CONNECTION_ERROR,
    });
  }
};

export const signin2 = (form) => (dispatch) => (onSuccess) => (onError) => {
  const requestPayload = {
    Email: form.Email,
    Password: form.Password,
  };

  dispatch({
    type: LOGIN_REQUEST,
  });
  axiosInstance()
    .post(`auth/signin`, requestPayload)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      console.log(`res`, res);
      onSuccess(res.data);
    })
    .catch((err) => {
      const message = err.response
        ? err.response.data.message
        : CONNECTION_ERROR;

      dispatch({
        type: LOGIN_FAIL,
        payload: message,
      });

      onError(message);
    });
};

export const signout = () => (dispatch) => {
  typeof window !== "undefined" || localStorage.removeItem("user");
  typeof window !== "undefined" || localStorage.removeItem("token");
  //localStorage.removeItem("user");
  // localStorage.removeItem("token");
  // console.log('user', JSON.parse(localStorage.getItem("user")))
  dispatch({ type: CLEAR_AUTH_STATE });
  window.location.href = "/";
};
