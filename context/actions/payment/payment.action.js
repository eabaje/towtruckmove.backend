import {
  CREATE_PAYMENT_FAIL,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  GET_PAYMENTS_FAIL,
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  EDIT_PAYMENT_FAIL,
  EDIT_PAYMENT_REQUEST,
  EDIT_PAYMENT_SUCCESS,
  DELETE_PAYMENT_FAIL,
  DELETE_PAYMENT_REQUEST,
  DELETE_PAYMENT_SUCCESS,
} from "../../../constants/actionTypes";
import { CONNECTION_ERROR } from "../../../constants/api";
import axios from "../../../helpers/axiosInstance";

export const listPayments = () => (dispatch) => (onSuccess) => (onError) => {
  dispatch({
    type: GET_PAYMENTS_REQUEST,
  });
  axios
    .get(`/payment/findAll/`)
    .then((res) => {
      dispatch({ type: GET_PAYMENTS_SUCCESS, payload: res.data });

      onSuccess(res.data);
    })
    .catch((err) => {
      const message = err.response ? err.response.data : CONNECTION_ERROR;
      dispatch({ type: GET_PAYMENTS_FAIL, payload: message });
    });
};

export const listPaymentByCriteria = (url, params) => async (dispatch) => {
  dispatch({
    type: GET_PAYMENTS_REQUEST,
  });
  try {
    const { data } = await axios.get(`${url}${params}`);
    dispatch({ type: GET_PAYMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PAYMENTS_FAIL, payload: error.message });
  }
};

export const createPayment =
  (form) => (dispatch) => (onSuccess) => (onError) => {
    console.log("form", form);
    const requestPayload = {
      UserId: form.UserId || "",
      OrderId: form.OrderId || "",
      TotalPrice: form.TotalPrice || "",
      PaymentSessionId: form.PaymentSessionId || "",
      ReferenceId: form.ReferenceId || "",
      OrderStatus: form.OrderStatus || "",
      PaymentMethod: form.PaymentMethod || "",
    };

    dispatch({ type: CREATE_PAYMENT_REQUEST });
    axios
      .post("/payment/create", form)
      .then((res) => {
        dispatch({
          type: CREATE_PAYMENT_SUCCESS,
          payload: res.data,
        });

        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({
          type: CREATE_PAYMENT_FAIL,
          payload: message,
        });
        onError(message);
      });
  };

export const editPayment = (form, paymentId) => async (dispatch) => {
  const requestPayload = {
    PaymentId: paymentId || form.PaymentId,
    UserId: form.UserId || "",
    OrderId: form.OrderId || "",
    TotalPrice: form.TotalPrice || "",
    PaymentSessionId: form.PaymentSessionId || "",
    ReferenceId: form.ReferenceId || "",
    OrderStatus: form.OrderStatus || "",
    PaymentMethod: form.PaymentMethod || "",
  };

  dispatch({ type: EDIT_PAYMENT_REQUEST });

  try {
    const { res } = await axios.put(`/payment/update/`, requestPayload);

    dispatch({
      type: EDIT_PAYMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.message && error.message ? error.message : error.message;
    dispatch({ type: EDIT_PAYMENT_FAIL, payload: message });
  }
};

export const deletePayment = (paymentId) => async (dispatch) => {
  const requestPayload = {
    PaymentId: paymentId,
  };

  dispatch({ type: DELETE_PAYMENT_REQUEST });

  try {
    const { res } = await axios.delete(`/payment/delete/${paymentId}`);

    dispatch({
      type: DELETE_PAYMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.message && error.message ? error.message : error.message;
    dispatch({ type: DELETE_PAYMENT_FAIL, payload: message });
  }
};
