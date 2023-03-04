import {
  CREATE_SHIPMENT_FAIL,
  CREATE_SHIPMENT_REQUEST,
  CREATE_SHIPMENT_SUCCESS,
  GET_SHIPMENTS_FAIL,
  GET_SHIPMENTS_REQUEST,
  GET_SHIPMENTS_SUCCESS,
  GET_SHIPMENT_FAIL,
  GET_SHIPMENT_REQUEST,
  GET_SHIPMENT_SUCCESS,
  EDIT_SHIPMENT_FAIL,
  EDIT_SHIPMENT_REQUEST,
  EDIT_SHIPMENT_SUCCESS,
  GET_INTERESTS_FAIL,
  GET_INTERESTS_SUCCESS,
  GET_INTERESTS_REQUEST,
} from "../../../constants/actionTypes";
import { CONNECTION_ERROR } from "../../../constants/api";
import axios from "../../../helpers/axiosInstance";
import axiosInstance from "../../../helpers/axiosInstance-2";

export const listShipments = () => (dispatch) => (onSuccess) => (onError) => {
  dispatch({
    type: GET_SHIPMENTS_REQUEST,
  });
  axiosInstance()
    .get(`/shipment/findAll/`)
    .then((res) => {
      dispatch({ type: GET_SHIPMENTS_SUCCESS, payload: res.data });
      console.log(`res.data`, res.data);
      onSuccess(res.data);
    })

    .catch((err) => {
      const message = err.response ? err.response.data : CONNECTION_ERROR;
      dispatch({ type: GET_SHIPMENTS_FAIL, payload: message });
      onError(message);
    });
};

export const listShipmentsByShipmentId =
  (shipmentId) => (dispatch) => (onSuccess) => (onError) => {
    dispatch({
      type: GET_SHIPMENT_REQUEST,
    });
    axiosInstance()
      .get(`/shipment/findOne/${shipmentId}`)
      .then((res) => {
        dispatch({ type: GET_SHIPMENT_SUCCESS, payload: res.data });
        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: GET_SHIPMENT_FAIL, payload: message });
        onError(message);
      });
  };
export const listShipmentsByUserId =
  (userId) => (dispatch) => (onSuccess) => (onError) => {
    dispatch({
      type: GET_SHIPMENTS_REQUEST,
    });
    axiosInstance()
      .get(`/shipment/findAll/${userId}`)
      .then((res) => {
        dispatch({ type: GET_SHIPMENTS_SUCCESS, payload: res.data });
        console.log(`res.data`, res.data);
        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: GET_SHIPMENTS_FAIL, payload: message });
        onError(message);
      });
  };
export const listShipmentsByDate = (fromDate, endDate) => async (dispatch) => {
  dispatch({
    type: GET_SHIPMENTS_REQUEST,
  });
  try {
    const { res } = await axios.get(
      `/shipment/findAllShipmentsByRecordDate/${fromDate}/${endDate}/}`
    );
    dispatch({ type: GET_SHIPMENTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_SHIPMENTS_FAIL, payload: error.message });
  }
};

export const listShipmentsByDeliveryDate =
  (fromDate, endDate) => async (dispatch) => {
    dispatch({
      type: GET_SHIPMENTS_REQUEST,
    });
    try {
      const { res } = await axios.get(
        `/shipment/findAllShipmentsByDeliveryDate/${fromDate}/${endDate}/}`
      );
      dispatch({ type: GET_SHIPMENTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_SHIPMENTS_FAIL, payload: error.message });
    }
  };

export const listShipmentsByPickUpDate =
  (fromDate, endDate) => async (dispatch) => {
    dispatch({
      type: GET_SHIPMENTS_REQUEST,
    });
    try {
      const { res } = await axios.get(
        `/shipment/findAllShipmentsByPickUpDate/${fromDate}/${endDate}/}`
      );
      dispatch({ type: GET_SHIPMENTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_SHIPMENTS_FAIL, payload: error.message });
    }
  };

export const listShipmentsByStatus =
  (shipmentStatus, shipmentid) => async (dispatch) => {
    dispatch({
      type: GET_SHIPMENTS_REQUEST,
    });
    try {
      const { res } = await axios.get(
        `/shipment/findAllShipmentsByStatus/${shipmentStatus}/${shipmentid}/}`
      );
      dispatch({ type: GET_SHIPMENTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_SHIPMENTS_FAIL, payload: error.message });
    }
  };

export const listShipmentsByAssigned =
  (shipmentid, assignedshipment) => async (dispatch) => {
    dispatch({
      type: GET_SHIPMENTS_REQUEST,
    });
    try {
      const { res } = await axios.get(
        `/shipment/findAllShipmentsByStatus/${shipmentid}/${assignedshipment}/}`
      );
      dispatch({ type: GET_SHIPMENTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_SHIPMENTS_FAIL, payload: error.message });
    }
  };

export const listShipmentByCriteria = (url, params) => async (dispatch) => {
  dispatch({
    type: GET_SHIPMENTS_REQUEST,
  });
  try {
    const { data } = await axios.get(`${url}${params}`);
    dispatch({ type: GET_SHIPMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SHIPMENTS_FAIL, payload: error.message });
  }
};

export const createShipment =
  (form) => (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      CompanyId: form.CompanyId || "",
      LoadCategory: form.LoadCategory || "",
      LoadType: form.LoadType || "",
      LoadWeight: form.LoadWeight || "",
      LoadUnit: form.LoadUnit || "",
      Qty: form.Qty || "",
      Description: form.Description || "",
      PickUpCountry: form.PickUpCountry,
      PickUpRegion: form.PickUpRegion,
      PickUpLocation: form.PickUpLocation,
      DeliveryCountry: form.DeliveryCountry,
      DeliveryRegion: form.DeliveryRegion,
      DeliveryLocation: form.DeliveryLocation,
      ExpectedPickUpDate: form.ExpectedPickUpDate,
      ExpectedDeliveryDate: form.ExpectedDeliveryDate,
      RequestForShipment: form.RequestForShipment,
      ShipmentRequestPrice: form.ShipmentRequestPrice,
      DeliveryContactName: form.DeliveryContactName,
      DeliveryContactPhone: form.DeliveryContactPhone,
      DeliveryEmail: form.DeliveryEmail,
      AssignedShipment: form.AssignedShipment,
      ShipmentDate: form.ShipmentDate,
      ShipmentDocs: form.ShipmentDocs || "",
      ShipmentStatus: form.ShipmentStatus || "",
      // contact_picture: form.contactPicture || null,
      // is_favorite: form.isFavorite || false,
    };

    dispatch({ type: CREATE_SHIPMENT_REQUEST });

    axios
      .post(`/shipment/create/`, form)

      .then((res) => {
        dispatch({ type: CREATE_SHIPMENT_SUCCESS, payload: res.data });
        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: CREATE_SHIPMENT_FAIL, payload: message });
        onError(message);
      });
  };

export const editShipment =
  (form, shipmentId) => (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      ShipmentId: shipmentId || form.ShipmentId,
      UserId: form.UserId,
      CompanyId: form.CompanyId || "",
      LoadCategory: form.LoadCategory || "",
      LoadType: form.LoadType || "",
      LoadWeight: form.LoadWeight || "",
      LoadUnit: form.LoadUnit || "",
      Qty: form.Qty || "",
      Description: form.Description || "",
      PickUpCountry: form.PickUpCountry,
      PickUpRegion: form.PickUpRegion,
      PickUpLocation: form.PickUpLocation,
      DeliveryCountry: form.DeliveryCountry,
      DeliveryRegion: form.DeliveryRegion,
      DeliveryLocation: form.DeliveryLocation,
      ExpectedPickUpDate: form.ExpectedPickUpDate,
      ExpectedDeliveryDate: form.ExpectedDeliveryDate,
      RequestForShipment: form.RequestForShipment,
      ShipmentRequestPrice: form.ShipmentRequestPrice,
      DeliveryContactName: form.DeliveryContactName,
      DeliveryContactPhone: form.DeliveryContactPhone,
      DeliveryEmail: form.DeliveryEmail,
      AssignedShipment: form.AssignedShipment,
      ShipmentDate: form.ShipmentDate || "",
      ShipmentDocs: form.ShipmentDocs || "",
      ShipmentStatus: form.ShipmentStatus || "",
      // contact_picture: form.contactPicture || null,
      // is_favorite: form.isFavorite || false,
    };

    dispatch({ type: EDIT_SHIPMENT_REQUEST });
    console.log("shipmentId", shipmentId);
    axios
      .put(`/shipment/update/${shipmentId}`, form)
      .then((res) => {
        dispatch({ type: EDIT_SHIPMENT_SUCCESS, payload: res.data });
        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: EDIT_SHIPMENT_FAIL, payload: message });
        onError(message);
      });
  };

export const showInterest =
  (form) => (dispatch) => (onSuccess) => (onError) => {
    //  {shipmentId,userId,}
    dispatch({ type: CREATE_SHIPMENT_REQUEST });

    axios
      .post(`/shipment/showInterest/`, form)
      .then((res) => {
        dispatch({ type: CREATE_SHIPMENT_SUCCESS, payload: res.data });
        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: CREATE_SHIPMENT_FAIL, payload: message });
        onError(message);
      });
  };

export const listShipmentsInterest =
  () => (dispatch) => (onSuccess) => (onError) => {
    dispatch({
      type: GET_INTERESTS_REQUEST,
    });
    axios
      .get(`/shipment/findAllShipmentsInterest/`)
      .then((res) => {
        dispatch({ type: GET_INTERESTS_SUCCESS, payload: res.data });

        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: GET_INTERESTS_FAIL, payload: message });
        onError(message);
      });
  };

export const listShipmentsInterestByShipmentId =
  (shipmentId) => (dispatch) => (onSuccess) => (onError) => {
    dispatch({
      type: GET_INTERESTS_REQUEST,
    });
    axios
      .get(`/shipment/findAllShipmentsInterestByShipmentId/${shipmentId}`)
      .then((res) => {
        dispatch({ type: GET_INTERESTS_SUCCESS, payload: res.data });

        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: GET_INTERESTS_FAIL, payload: message });
        onError(message);
      });
  };

export const listShipmentsInterestByCompany =
  (companyId) => (dispatch) => (onSuccess) => (onError) => {
    dispatch({
      type: GET_INTERESTS_REQUEST,
    });
    axios
      .get(`/shipment/findAllShipmentsInterestByCompany/${companyId}`)
      .then((res) => {
        dispatch({ type: GET_INTERESTS_SUCCESS, payload: res.data });

        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: GET_INTERESTS_FAIL, payload: message });
        onError(message);
      });
  };

export const listAllAssignedShipments =
  () => (dispatch) => (onSuccess) => (onError) => {
    dispatch({
      type: GET_INTERESTS_REQUEST,
    });
    axios
      .get(`/shipment/findAllAssignShipment/`)
      .then((res) => {
        dispatch({ type: GET_INTERESTS_SUCCESS, payload: res.data });

        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: GET_INTERESTS_FAIL, payload: message });
        onError(message);
      });
  };

export const listAllAssignedDriverShipments =
  () => (dispatch) => (onSuccess) => (onError) => {
    dispatch({
      type: GET_INTERESTS_REQUEST,
    });
    axios
      .get(`/shipment/findAllAssignDriverShipment/`)
      .then((res) => {
        dispatch({ type: GET_INTERESTS_SUCCESS, payload: res.data });

        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: GET_INTERESTS_FAIL, payload: message });
        onError(message);
      });
  };

export const AssignShipmentsToDriver =
  (form) => (dispatch) => (onSuccess) => (onError) => {
    //  {shipmentId,userId,}
    dispatch({ type: CREATE_SHIPMENT_REQUEST });

    axios
      .post(`/shipment/assignDriverShipment/`, form)
      .then((res) => {
        dispatch({ type: CREATE_SHIPMENT_SUCCESS, payload: res.data });
        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: CREATE_SHIPMENT_FAIL, payload: message });
        onError(message);
      });
  };

export const AssignShipmentsToCompany =
  (form) => (dispatch) => (onSuccess) => (onError) => {
    //  {shipmentId,userId,}
    dispatch({ type: CREATE_SHIPMENT_REQUEST });

    axios
      .post(`/shipment/assignCompanyShipment/`, form)
      .then((res) => {
        dispatch({ type: CREATE_SHIPMENT_SUCCESS, payload: res.data });
        onSuccess(res.data);
      })

      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: CREATE_SHIPMENT_FAIL, payload: message });
        onError(message);
      });
  };
