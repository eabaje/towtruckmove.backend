import {
  CREATE_COMPANY_FAIL,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,
  GET_COMPANYS_FAIL,
  GET_COMPANYS_REQUEST,
  GET_COMPANYS_SUCCESS,
  EDIT_COMPANY_FAIL,
  EDIT_COMPANY_REQUEST,
  EDIT_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
} from "../../../constants/actionTypes";
import { CONNECTION_ERROR } from "../../../constants/api";
import axios from "../../../helpers/axiosInstance";

export const listCompanys = () => (dispatch) => (onSuccess) => (onError) => {
  dispatch({
    type: GET_COMPANYS_REQUEST,
  });

  axios
    .get(`/user/companyAll/`)
    .then((res) => {
      dispatch({ type: GET_COMPANYS_SUCCESS, payload: res.data });
    //  console.log(`res.data`, res.data);
      onSuccess(res.data);
    })

    .catch((err) => {
      const message = err.response ? err.response.data : CONNECTION_ERROR;
      dispatch({ type: GET_COMPANYS_FAIL, payload: message });
      onError(message);
    });
};

export const listCompanyByCriteria = (url, params) => async (dispatch) => {
  dispatch({
    type: GET_COMPANYS_REQUEST,
  });
  try {
    const { data } = await axios.get(`${url}${params}`);
    dispatch({ type: GET_COMPANYS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_COMPANYS_FAIL, payload: err.message });
  }
};

export const listCompanysByCompanyId = (userId) => async (dispatch) => {
  dispatch({
    type: GET_COMPANYS_REQUEST,
  });
  try {
    const { res } = await axios.get(`/user/findOne/${userId}`);
    dispatch({ type: GET_COMPANYS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_COMPANYS_FAIL, payload: err.message });
  }
};

export const listCompanysByName = (name) => async (dispatch) => {
  dispatch({
    type: GET_COMPANYS_REQUEST,
  });
  try {
    const { res } = await axios.get(`/user/findAllBySearch/${name}`);
    dispatch({ type: GET_COMPANYS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_COMPANYS_FAIL, payload: err.message });
  }
};

export const listCompanysByDate = (fromDate, endDate) => async (dispatch) => {
  dispatch({
    type: GET_COMPANYS_REQUEST,
  });
  try {
    const { res } = await axios.get(
      `/user/findAllProfilesByDate/${fromDate}/${endDate}/}`
    );
    dispatch({ type: GET_COMPANYS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_COMPANYS_FAIL, payload: err.message });
  }
};

export const createCompany =
  (form) => (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      CompanyId: form.CompanyId || "",
      FirstName: form.FirstName || "",
      LastName: form.LastName || "",
      FullName: form.FirstName + " " + form.LastName,
      Email: form.Email || "",
      Phone: form.Phone || "",
      Address: form.Address || "",
      City: form.City || "",
      Country: form.Country || "",
      CompanyPicUrl: form.CompanyPicUrl || null,
    };

    dispatch({ type: CREATE_COMPANY_REQUEST });

    axios
      .post(`/user/create/`, form)
      .then((res) => {
        dispatch({
          type: CREATE_COMPANY_SUCCESS,
          payload: res.data,
        });
        onSuccess(res.data);
      })

      .catch((err) => {
        const message =
          err.message && err.response.data.message
            ? err.response.data.message
            : err.response.data.message;
        dispatch({ type: CREATE_COMPANY_FAIL, payload: message });
        onError(message);
      });
  };

export const editCompany =
  (form, userId) => (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      CompanyId: form.CompanyId || "",
      CompanyId: form.CompanyId || "",
      FirstName: form.FirstName || "",
      LastName: form.LastName || "",
      FullName: form.FirstName + " " + form.LastName,
      Email: form.Email || "",
      Phone: form.Phone || "",
      Address: form.Address || "",
      City: form.City || "",
      Country: form.Country || "",
      CompanyPicUrl: form.CompanyPicUrl || null,
    };

    dispatch({ type: EDIT_COMPANY_REQUEST });

    axios
      .put(`/user/update/`, form)

      .then((res) => {
        dispatch({
          type: EDIT_COMPANY_SUCCESS,
          payload: res.data,
        });
        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: CREATE_COMPANY_FAIL, payload: message });
        onError(message);
      });
  };

export const deleteCompany = (userId) => async (dispatch) => {
  const requestPayload = {
    ProfileId: userId,
  };

  dispatch({ type: DELETE_COMPANY_REQUEST });

  try {
    const { res } = await axios.delete(`/user/delete/${userId}`);

    dispatch({
      type: DELETE_COMPANY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const message =
      err.message && err.response.data.message
        ? err.response.data.message
        : err.response.data.message;
    dispatch({ type: DELETE_COMPANY_FAIL, payload: message });
  }
};

//Section  Company Subscription

export const listCompanySubscriptionByEndDate =
  (fromDate, endDate) => async (dispatch) => {
    dispatch({
      type: GET_COMPANYS_REQUEST,
    });
    try {
      const { res } = await axios.get(
        `/user/findAllCompanySubscriptionsByEndDate/${fromDate}/${endDate}/}`
      );
      dispatch({ type: GET_COMPANYS_SUCCESS, payload: res.data });
    } catch (err) {
      const message =
        err.message && err.response.data.message
          ? err.response.data.message
          : err.response.data.message;
      dispatch({ type: GET_COMPANYS_FAIL, payload: message });
    }
  };

export const subcribeCompany =
  (form) => (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      SubscriptionId: form.SubscriptionId || "",
      SubscriptionName: form.SubscriptionName || "",
      CompanyId: form.CompanyId || "",
      Active: form.Active ? true : false,
      StartDate: form.StartDate || "",
      EndDate: form.Phone || "",
    };

    dispatch({ type: CREATE_COMPANY_REQUEST });

    axios
      .post(`/user/subscribe/`, form)
      .then((res) => {
        dispatch({
          type: CREATE_COMPANY_SUCCESS,
          payload: res.data,
        });
        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: CREATE_COMPANY_FAIL, payload: message });
        onError(message);
      });
  };

export const updateCompanySubscription =
  (form, CompanySubscriptionId) => (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      CompanySubscriptionId: form.CompanySubscriptionId || "",
      SubscriptionId: form.SubscriptionId || "",
      SubscriptionName: form.SubscriptionName || "",
      CompanyId: form.CompanyId || "",
      Active: form.Active ? true : false,
      StartDate: form.StartDate || "",
      EndDate: form.EndDate || "",
    };

    dispatch({ type: EDIT_COMPANY_REQUEST });

    axios
      .put(`/user/updateCompanySubscription/`, form)
      .then((res) => {
        dispatch({
          type: CREATE_COMPANY_SUCCESS,
          payload: res.data,
        });
        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: CREATE_COMPANY_FAIL, payload: message });
        onError(message);
      });
  };

export const upgradeCompanySubscription =
  (form) => (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      CompanySubscriptionId: form.CompanySubscriptionId || "",
      SubscriptionId: form.SubscriptionId || "",
      SubscriptionName: form.SubscriptionName || "",
      CompanyId: form.CompanyId || "",
      Active: form.Active ? true : false,
      StartDate: form.StartDate || "",
      EndDate: form.EndDate || "",
    };

    dispatch({ type: EDIT_COMPANY_REQUEST });

    axios
      .post(`/user/upgradeCompanySubscription/`, form)
      .then((res) => {
        dispatch({
          type: CREATE_COMPANY_SUCCESS,
          payload: res.data,
        });
        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: CREATE_COMPANY_FAIL, payload: message });
        onError(message);
      });
  };
