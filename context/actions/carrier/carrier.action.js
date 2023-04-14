import {
  CREATE_CARRIER_FAIL,
  CREATE_CARRIER_REQUEST,
  CREATE_CARRIER_SUCCESS,
  GET_CARRIERS_FAIL,
  GET_CARRIERS_REQUEST,
  GET_CARRIERS_SUCCESS,
  EDIT_CARRIER_FAIL,
  EDIT_CARRIER_REQUEST,
  EDIT_CARRIER_SUCCESS,
  DELETE_CARRIER_FAIL,
  DELETE_CARRIER_REQUEST,
  DELETE_CARRIER_SUCCESS,
} from "../../../constants/actionTypes";
import { CONNECTION_ERROR } from "../../../constants/api";
import axios from "../../../helpers/axiosInstance";

export const listCarriers = () => (dispatch) => (onSuccess) => (onError) => {
  dispatch({
    type: GET_CARRIERS_REQUEST,
  });
  axios
    .get(`/carrier/findAll/`)
    .then((res) => {
      dispatch({ type: GET_CARRIERS_SUCCESS, payload: res.data });
      onSuccess(res.data);
    })

    .catch((err) => {
      const message = err.response ? err.response.data : CONNECTION_ERROR;
      dispatch({ type: GET_CARRIERS_FAIL, payload: message });

      onError(message);
    });
};

export const listCarriersByIdAsync = (carrierId) => async (dispatch) => {
  dispatch({
    type: GET_CARRIERS_REQUEST,
  });
  try {
    const { res } = await axios.get(`/carrier/findOne/${carrierId}`);
    dispatch({ type: GET_CARRIERS_SUCCESS, payload: res.data });
    return res.data.data;
  } catch (error) {
    dispatch({ type: GET_CARRIERS_FAIL, payload: error.message });
  }
};

export const listCarriersById = (carrierId) => (dispatch) => (onSuccess) => {
  dispatch({
    type: GET_CARRIERS_REQUEST,
  });

  axios
    .get(`/carrier/findOne/${carrierId}`)
    .then((res) => {
      //  console.log(`carrier_data`, res.data);
      dispatch({
        type: GET_CARRIERS_SUCCESS,
        payload: res.data,
      });

      onSuccess();
    })
    .catch((err) => {
      const message = err.response ? err.response.data : CONNECTION_ERROR;
      
      dispatch({
        type: GET_CARRIERS_FAIL,
        payload: err.message
          ? err.message
          : { error: "Something went wrong, try again" },
      });
    });
};

export const listCarriersByCompany =
  (companyId) => (dispatch) => (onSuccess) => (onError) =>{
    dispatch({
      type: GET_CARRIERS_REQUEST,
    });

    axios
      .get(`/carrier/findAllCarriersByCompany/${companyId}`)
      .then((res) => {
        //  console.log(`carrier_data`, res.data);
        dispatch({
          type: GET_CARRIERS_SUCCESS,
          payload: res.data,
        });

        onSuccess();
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({
          type: GET_CARRIERS_FAIL,
          payload: message,
        });
        onError(message);
      });
  };

export const listCarriersByVehicle = (vehicleId) => async (dispatch) => {
  dispatch({
    type: GET_CARRIERS_REQUEST,
  });
  try {
    const { res } = await axios.get(
      `/carrier/findAllCarriersByVehicle/${vehicleId}`
    );
    dispatch({ type: GET_CARRIERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_CARRIERS_FAIL, payload: error.message });
   
  }
};

export const listCarriersLicensed = () => async (dispatch) => {
  dispatch({
    type: GET_CARRIERS_REQUEST,
  });
  try {
    const { res } = await axios.get(`/carrier/findAllCarriersLicensed/`);
    dispatch({ type: GET_CARRIERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_CARRIERS_FAIL, payload: error.message });
  }
};

export const listCarriersByDate = (fromDate, endDate) => async (dispatch) => {
  dispatch({
    type: GET_CARRIERS_REQUEST,
  });
  try {
    const { res } = await axios.get(
      `/carrier/findAllCarriersByDate/${fromDate}/${endDate}/}`
    );
    dispatch({ type: GET_CARRIERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_CARRIERS_FAIL, payload: error.message });
  }
};

export const listCarrierByCriteria = (url, params) => async (dispatch) => {
  dispatch({
    type: GET_CARRIERS_REQUEST,
  });
  try {
    const { data } = await axios.get(`${url}${params}`);
    dispatch({ type: GET_CARRIERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CARRIERS_FAIL, payload: error.message });
  }
};

export const createCarrier1 = (form) => async (dispatch) => {
  // const requestPayload = {
  //   CompanyId: form.CompanyId ,
  //   CarrierName: form.CarrierName ,
  //   Email: form.Email || "",
  //   Phone: form.Phone || "",
  //   Address: form.Address || "",
  //   City: form.City || "",
  //   Country: form.Country || "",
  //   Licensed: form.Licensed || "",
  //   LicenseUrl: form.LicenseUrl || "",
  //   Rating: form.Rating ,
  //   CarrierDocs: form.CarrierDocs || "",
  //   PicUrl: form.PicUrl || null,
  // };

  dispatch({ type: CREATE_CARRIER_REQUEST });

  try {
    const { res } = await axios.post(`/carrier/create/`, form);

    dispatch({
      type: CREATE_CARRIER_SUCCESS,
      payload: res.data,
    });

    return res.data;
  } catch (error) {
    const message =
      error.message && error.message ? error.message : error.message;
    dispatch({ type: CREATE_CARRIER_FAIL, payload: message });
  }
};
export const createCarrier =
  (form) => (dispatch) => (onSuccess) => (onError) => {
    // const requestPayload = {
    //   CompanyId: form.CompanyId ,
    //   CarrierName: form.CarrierName ,
    //   Email: form.Email || "",
    //   Phone: form.Phone || "",
    //   Address: form.Address || "",
    //   City: form.City || "",
    //   Country: form.Country || "",
    //   Licensed: form.Licensed || "",
    //   LicenseUrl: form.LicenseUrl || "",
    //   Rating: form.Rating ,
    //   CarrierDocs: form.CarrierDocs || "",
    //   PicUrl: form.PicUrl || null,
    // };

    dispatch({
      type: CREATE_CARRIER_REQUEST,
    });

    axios
      .post("/carrier/create", form)
      .then((res) => {
        dispatch({
          type: CREATE_CARRIER_SUCCESS,
          payload: res.data,
        });

        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({
          type: CREATE_CARRIER_FAIL,
          payload: message,
        });
        onError(message);
      });
  };

export const editCarrier =
  (form, carrierId) => (dispatch) => (onSuccess) => (onError) => {
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

    dispatch({ type: EDIT_CARRIER_REQUEST });

    axios
      .put(`/carrier/update/${carrierId}`, form)

      .then((res) => {
        dispatch({
          type: EDIT_CARRIER_SUCCESS,
          payload: res.data,
        });

        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: EDIT_CARRIER_FAIL, payload: message });

        onError(message);
      });
  };

export const deleteCarrier = (carrierId) => async (dispatch) => {
  dispatch({ type: DELETE_CARRIER_REQUEST });

  try {
    const { res } = await axios.delete(`/carrier/delete/${carrierId}`);

    dispatch({
      type: DELETE_CARRIER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.message && error.message ? error.message : error.message;
    dispatch({ type: DELETE_CARRIER_FAIL, payload: message });
  }
};
