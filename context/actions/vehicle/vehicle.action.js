import {
  CREATE_VEHICLE_FAIL,
  CREATE_VEHICLE_REQUEST,
  CREATE_VEHICLE_SUCCESS,
  GET_VEHICLES_FAIL,
  GET_VEHICLES_REQUEST,
  GET_VEHICLES_SUCCESS,
  EDIT_VEHICLE_FAIL,
  EDIT_VEHICLE_REQUEST,
  EDIT_VEHICLE_SUCCESS,
  DELETE_VEHICLE_FAIL,
  DELETE_VEHICLE_REQUEST,
  DELETE_VEHICLE_SUCCESS,
} from "../../../constants/actionTypes";
import axios from "../../../helpers/axiosInstance";
import { CONNECTION_ERROR } from "../../../constants/api";
import Axios from "axios";
import { API_URL } from "../../../constants";

export const listVehicles =
  (vehicleType = null) =>
  (dispatch) => {
    //(onSuccess)=>(onError) =>
    const url = vehicleType
      ? `vehicle/findAll/${vehicleType}`
      : `vehicle/findAll/`;
     
    dispatch({
      type: GET_VEHICLES_REQUEST,
    });
    axios.get(url)
      .then((res) => {
        dispatch({ type: GET_VEHICLES_SUCCESS, payload: res.data });
        //  onSuccess(res.data);
      })
      .catch((err) => {
        dispatch({
          type: GET_VEHICLES_FAIL,
          payload: err.response ? err.response.data : CONNECTION_ERROR,
        });
        // onError( error.response.data.message);
      });
  };
export const listVehiclesByCarrier = (carrierId, vehicleType) => (dispatch) => {
  //(onSuccess)=>(onError) =>
  const url = `vehicle/findAllVehiclesByCategory/${carrierId}/${vehicleType}`;

  dispatch({
    type: GET_VEHICLES_REQUEST,
  });
  axios.get(url)
    .then((res) => {
      dispatch({ type: GET_VEHICLES_SUCCESS, payload: res.data });
      //  onSuccess(res.data);
    })
    .catch((err) => {
      dispatch({
        type: GET_VEHICLES_FAIL,
        payload: err.response ? err.response.data : CONNECTION_ERROR,
      });
      // onError( error.response.data.message);
    });
};

export const listVehiclesByCompany = (companyId) => (dispatch) =>(onSuccess)=>(onError) => {
  //
  const url = `/vehicle/findAllVehiclesByCompany/${companyId}`;

  dispatch({
    type: GET_VEHICLES_REQUEST,
  });
  axios
    .get(url)
    .then((res) => {
      dispatch({ type: GET_VEHICLES_SUCCESS, payload: res.data });
        onSuccess(res.data);
    })
    .catch((err) => {
      const message=err.response ? err.response.data : CONNECTION_ERROR
      dispatch({
        type: GET_VEHICLES_FAIL,
        payload: message,
      });
       onError( message);
    });
};
export const listVehiclesByVehicleId =
  (vehicleId) => (dispatch) => (onSuccess) => (onError) => {
    dispatch({
      type: GET_VEHICLES_REQUEST,
    });
    axios
      .get(`/vehicle/findOne/${vehicleId}`)
      .then((res) => {
        dispatch({ type: GET_VEHICLES_SUCCESS, payload: res.data });
        onSuccess(res.data);
      })

      .catch((error) => {
        dispatch({
          type: GET_VEHICLES_FAIL,
          payload: error.response.data.message,
        });
        onError(error.response.data.message);
      });
  };

export const listVehiclesInsured = () => async (dispatch) => {
  dispatch({
    type: GET_VEHICLES_REQUEST,
  });
  try {
    const { res } = await axios.get(`/vehicle/findAllVehiclesInsured/`);
    dispatch({ type: GET_VEHICLES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_VEHICLES_FAIL, payload: error.message });
  }
};

export const listVehiclesLicensed = () => async (dispatch) => {
  dispatch({
    type: GET_VEHICLES_REQUEST,
  });
  try {
    const { res } = await axios.get(`/vehicle/findAllVehiclesLicensed/`);
    dispatch({ type: GET_VEHICLES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_VEHICLES_FAIL, payload: error.message });
  }
};

export const listVehiclesByDate = (fromDate, endDate) => async (dispatch) => {
  dispatch({
    type: GET_VEHICLES_REQUEST,
  });
  try {
    const { res } = await axios.get(
      `/vehicle/findAllVehiclesByDate/${fromDate}/${endDate}/}`
    );
    dispatch({ type: GET_VEHICLES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_VEHICLES_FAIL, payload: error.message });
  }
};

export const createVehicle =
  (form) => (dispatch) => (onSuccess) => (onError) => {
    // const requestPayload = {
    //   CarrierId: form.CarrierId,
    //   VehicleType: form.VehicleType,
    //   VehicleNumber: form.VehicleNumber,
    //   SerialNumber: form.SerialNumber,
    //   VehicleMake: form.VehicleMake,
    //   VehicleColor: form.VehicleColor,
    //   VehicleModel: form.VehicleModel,
    //   LicensePlate: form.LicensePlate,
    //   VehicleModelYear: form.VehicleModelYear,
    //   PurchaseYear: form.PurchaseYear,
    //   Insured: form.Insured ? form.Insured : false,
    //   PicUrl: form.PicUrl || null,
    //   VehicleDocs: form.VehicleDocs || "",
    // };

    dispatch({ type: CREATE_VEHICLE_REQUEST });

    axios
      .post(`/vehicle/create/`, form)
      .then((res) => {
        dispatch({
          type: CREATE_VEHICLE_SUCCESS,
          payload: res.data,
        });
        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;

        dispatch({ type: CREATE_VEHICLE_FAIL, payload: message });

        onError(message);
      });
  };

export const editVehicle =
  (form, vehicleId) => (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      VehicleId: vehicleId || form.VehicleId,
      CarrierId: form.CarrierId,
      VehicleType: form.VehicleType,
      VehicleNumber: form.VehicleNumber,
      SerialNumber: form.SerialNumber,
      VehicleMake: form.VehicleMake,
      VehicleColor: form.VehicleColor,
      VehicleModel: form.VehicleModel,
      LicensePlate: form.LicensePlate,
      VehicleModelYear: form.VehicleModelYear,
      PurchaseYear: form.PurchaseYear,
      Insured: form.Insured ? form.Insured : false,
      PicUrl: form.PicUrl || null,
      VehicleDocs: form.VehicleDocs || "",
    };
//console.log('form', form)
    dispatch({ type: EDIT_VEHICLE_REQUEST });

    axios
      .put(`/vehicle/update/${vehicleId}`, form)
      .then((res) => {
        dispatch({
          type: EDIT_VEHICLE_SUCCESS,
          payload: res.data,
        });
        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;

        dispatch({ type: EDIT_VEHICLE_FAIL, payload: message });
        onError(message);
      });
  };

export const deleteVehicle = (vehicleId) => async (dispatch) => {
  dispatch({ type: DELETE_VEHICLE_REQUEST });

  try {
    const { res } = await axios.delete(`/vehicle/delete/${vehicleId}`);

    dispatch({
      type: DELETE_VEHICLE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.message && error.message ? error.message : error.message;
    dispatch({ type: DELETE_VEHICLE_FAIL, payload: message });
  }
};
