import {
  CREATE_SUBSCRIBE_FAIL,
  CREATE_SUBSCRIBE_REQUEST,
  CREATE_SUBSCRIBE_SUCCESS,
  GET_SUBSCRIBES_FAIL,
  GET_SUBSCRIBES_REQUEST,
  GET_SUBSCRIBES_SUCCESS,
  EDIT_SUBSCRIBE_FAIL,
  EDIT_SUBSCRIBE_REQUEST,
  EDIT_SUBSCRIBE_SUCCESS,
  DELETE_SUBSCRIBE_FAIL,
  DELETE_SUBSCRIBE_REQUEST,
  DELETE_SUBSCRIBE_SUCCESS,
} from "../../../constants/actionTypes";
import { CONNECTION_ERROR } from "../../../constants/api";
import axios from "../../../helpers/axiosInstance";

export const listSubscriptions = () => (dispatch) => {
  //  => (onSuccess) => (onError)
  dispatch({
    type: GET_SUBSCRIBES_REQUEST,
  });
  //  console.log(`GET_SUBSCRIBES_REQUEST`, GET_SUBSCRIBES_REQUEST);
  axios
    .get(`/subscription/findAll/`)
    .then((res) => {
      dispatch({ type: GET_SUBSCRIBES_SUCCESS, payload: res.data });
      // onSuccess(res.data);
    })
    .catch((error) => {
      const message = error.response
        ? error.response.data
        : { error: "Something went wrong, try again" };
      dispatch({ type: GET_SUBSCRIBES_FAIL, payload: message });
      //  onError(message);
    });
};

export const listSubscriptionsBySubscriptionId =
  (subscriptionId) => async (dispatch) => {
    dispatch({
      type: GET_SUBSCRIBES_REQUEST,
    });
    try {
      const { res } = await axios.get(
        `/subscription/findOne/${subscriptionId}`
      );

      dispatch({ type: GET_SUBSCRIBES_SUCCESS, payload: res.data });

      return res.data.data;
    } catch (error) {
      dispatch({ type: GET_SUBSCRIBES_FAIL, payload: error.message });
    }
  };

export const listSubscriptionsByDate =
  (fromDate, endDate) => async (dispatch) => {
    dispatch({
      type: GET_SUBSCRIBES_REQUEST,
    });
    try {
      const { res } = await axios.get(
        `/subscription/findAllSubscriptionsByDate/${fromDate}/${endDate}/}`
      );
      dispatch({ type: GET_SUBSCRIBES_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_SUBSCRIBES_FAIL, payload: error.message });
    }
  };

export const listSubscriptionByCriteria = (url, params) => async (dispatch) => {
  dispatch({
    type: GET_SUBSCRIBES_REQUEST,
  });
  try {
    const { data } = await axios.get(`${url}${params}`);
    dispatch({ type: GET_SUBSCRIBES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SUBSCRIBES_FAIL, payload: error.message });
  }
};

export const createSubscription1 = (form) => async (dispatch) => {
  const requestPayload = {
    SubscriptionType: form.SubscriptionType || "",
    SubscriptionName: form.SubscriptionName || "",
    Amount: form.Amount || "",
    Active: form.Active || false,
    Description: form.Description || "",
    Duration: form.Duration || null,
  };

  dispatch({ type: CREATE_SUBSCRIBE_REQUEST });

  try {
    const { res } = await axios.post(`/subscription/create/`, requestPayload);

    dispatch({
      type: CREATE_SUBSCRIBE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message = error.message ? error.message : error;
    dispatch({ type: CREATE_SUBSCRIBE_FAIL, payload: message });
  }
};

export const createSubscription =
  (form) => (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      SubscriptionType: form.SubscriptionType || "",
      SubscriptionName: form.SubscriptionName || "",
      Amount: form.Amount || "",
      Description: form.Description || "",
      Duration: form.Duration || null,
    };

    dispatch({
      type: CREATE_SUBSCRIBE_REQUEST,
    });

    axios
      .post("/subscription/create", form)
      .then((res) => {
        dispatch({
          type: CREATE_SUBSCRIBE_SUCCESS,
          payload: res.data,
        });

        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({
          type: CREATE_SUBSCRIBE_FAIL,
          payload: message,
        });
        onError(message);
      });
  };

export const editSubscription =
  (subscriptionId, form) => (dispatch) => (onSuccess) => (onError) => {
    // const requestPayload = {
    //   SubscriptionId: subscriptionId || form.SubscriptionType || "",
    //   SubscriptionType: form.SubscriptionType || "",
    //   SubscriptionName: form.SubscriptionName || "",
    //   Amount: form.Amount || "",
    //   Description: form.Description || "",
    //   Duration: form.Duration || null,
    // };

    dispatch({ type: EDIT_SUBSCRIBE_REQUEST });

    axios
      .put(`/subscription/update/${subscriptionId}`, form)
      .then((res) => {
     //   console.log(`response`, res.data);
        dispatch({
          type: EDIT_SUBSCRIBE_SUCCESS,
          payload: res.data,
        });
        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: EDIT_SUBSCRIBE_FAIL, payload: message });
        onError(message);
      });
  };

export const deleteSubscription = (subscriptionId) => async (dispatch) => {
  dispatch({ type: DELETE_SUBSCRIBE_REQUEST });

  try {
    const { res } = await axios.delete(
      `/subscription/delete/${subscriptionId}`
    );

    dispatch({
      type: DELETE_SUBSCRIBE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const message = err.response ? err.response.data : CONNECTION_ERROR;
    dispatch({ type: DELETE_SUBSCRIBE_FAIL, payload: message });
  }
};
