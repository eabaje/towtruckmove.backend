import {
  CREATE_DRIVER_FAIL,
  CREATE_DRIVER_REQUEST,
  CREATE_DRIVER_SUCCESS,
  GET_DRIVERS_FAIL,
  GET_DRIVERS_REQUEST,
  GET_DRIVERS_SUCCESS,
  EDIT_DRIVER_FAIL,
  EDIT_DRIVER_REQUEST,
  EDIT_DRIVER_SUCCESS,
  DELETE_DRIVER_FAIL,
  DELETE_DRIVER_REQUEST,
  DELETE_DRIVER_SUCCESS,
  GET_DRIVER_FAIL,
  GET_DRIVER_SUCCESS,
  GET_DRIVER_REQUEST,
} from "../../../constants/actionTypes";
import { CONNECTION_ERROR } from "../../../constants/api";
import axios from "../../../helpers/axiosInstance";

export const listDrivers = () => async (dispatch) => {
  dispatch({
    type: GET_DRIVERS_REQUEST,
  });
  try {
    const { res } = await axios.get(`/driver/findAll/`);
    dispatch({ type: GET_DRIVERS_SUCCESS, payload: res.data });
  } catch (err) {
    const message = err.response ? err.response.data : CONNECTION_ERROR;
    dispatch({ type: GET_DRIVERS_FAIL, payload: message });
  }
};
export const listDriversByCompany =
  (companyId) => (dispatch) => (onSuccess) => (onError) => {
    dispatch({
      type: GET_DRIVERS_REQUEST,
    });
    axios
      .get(`/driver/findAllDriversByCompany/${companyId}`)
      .then((res) => {
        dispatch({ type: GET_DRIVERS_SUCCESS, payload: res.data });

        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({
          type: GET_DRIVERS_FAIL,
          payload: message,
        });
        onError(message);
      });
  };

export const listDriversById =
  (driverId) => (dispatch) => (onSuccess) => (onError) => {
    dispatch({
      type: GET_DRIVER_REQUEST,
    });
    axios
      .get(`/driver/findOne/${driverId}`)
      .then((res) => {
        dispatch({ type: GET_DRIVER_SUCCESS, payload: res.data });
        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({ type: GET_DRIVER_FAIL, payload: message });
        onError(message);
      });
  };

export const listDriversByDriverName = (driverName) => async (dispatch) => {
  dispatch({
    type: GET_DRIVERS_REQUEST,
  });
  try {
    const { res } = await axios.get(
      `/driver/findAllDriversByDriverName/${driverName}`
    );
    dispatch({ type: GET_DRIVERS_SUCCESS, payload: res.data });
  } catch (err) {
    const message = err.response ? err.response.data : CONNECTION_ERROR;
    dispatch({ type: GET_DRIVERS_FAIL, payload: message });
  }
};

export const listDriversByVehicle = (vehicleId) => async (dispatch) => {
  dispatch({
    type: GET_DRIVERS_REQUEST,
  });
  try {
    const { res } = await axios.get(
      `/driver/findAllDriversByVehicle/${vehicleId}`
    );
    dispatch({ type: GET_DRIVERS_SUCCESS, payload: res.data });
  } catch (err) {
    const message = err.response ? err.response.data : CONNECTION_ERROR;
    dispatch({ type: GET_DRIVERS_FAIL, payload: message });
  }
};

export const listDriversLicensed = () => async (dispatch) => {
  dispatch({
    type: GET_DRIVERS_REQUEST,
  });
  try {
    const { res } = await axios.get(`/driver/findAllDriversLicensed/`);
    dispatch({ type: GET_DRIVERS_SUCCESS, payload: res.data });
  } catch (err) {
    const message = err.response ? err.response.data : CONNECTION_ERROR;
    dispatch({ type: GET_DRIVERS_FAIL, payload: message });
  }
};

export const listDriversByDate = (fromDate, endDate) => async (dispatch) => {
  dispatch({
    type: GET_DRIVERS_REQUEST,
  });
  try {
    const { res } = await axios.get(
      `/driver/findAllDriversByDate/${fromDate}/${endDate}/}`
    );
    dispatch({ type: GET_DRIVERS_SUCCESS, payload: res.data });
  } catch (err) {
    const message = err.response ? err.response.data : CONNECTION_ERROR;
    dispatch({ type: GET_DRIVERS_FAIL, payload: message });
  }
};

export const createDriver1 = (form) => async (dispatch) => {
  const requestPayload = {
    CompanyId: form.CompanyId || "",
    DriverName: form.DriverName || "",
    Email: form.Email || "",
    Phone: form.Phone || "",
    Address: form.Address || "",
    City: form.City || "",
    Country: form.Country || "",
    Licensed: form.Licensed || "",
    LicenseUrl: form.LicenseUrl || "",
    Rating: form.Rating || "",
    DriverDocs: form.DriverDocs || "",
    PicUrl: form.PicUrl || null,
  };

  dispatch({ type: CREATE_DRIVER_REQUEST });

  try {
    const { res } = await axios.post(`/driver/create/`, form);

    dispatch({
      type: CREATE_DRIVER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const message = err.response ? err.response.data : CONNECTION_ERROR;
    dispatch({ type: CREATE_DRIVER_FAIL, payload: message });
  }
};

export const createDriver =
  (form, file1, file2) => (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      CompanyId: form.CompanyId || "",
      DriverName: form.DriverName || "",
      Email: form.Email || "",
      Phone: form.Phone || "",
      Address: form.Address || "",
      City: form.City || "",
      Country: form.Country || "",
      Licensed: form.Licensed || "",
      LicenseUrl: form.LicenseUrl || "",
      Rating: form.Rating || "",
      DriverDocs: form.DriverDocs || "",
      PicUrl: form.PicUrl || null,
    };

    // const formdata = new FormData();
    // formdata.append("PicUrl", picFile);
    // formdata.append("LicenseUrl", docFile);

    const data = new FormData();

    data.append("CompanyId", form.CompanyId);
    data.append("DriverName", form.DriverName);
    data.append("Email", form.Email);
    data.append("Phone", form.Phone);
    data.append("DOB", form.DOB);
    data.append("Address", form.Address);
    data.append("City", form.City);
    data.append("Region", form.Region);
    data.append("Country", form.Country);
    data.append("Licensed", form.Licensed);
    // data.append("filePicUrl", file1);
    // data.append("fileLicenseUrl", file2);
    if (file1 !== null) data.append("filePicUrl", file1);
    if (file2 !== null) data.append("fileLicenseUrl", file2);

    // console.log(`form-action`, data);
    dispatch({
      type: CREATE_DRIVER_REQUEST,
    });
    axios
      .post("/driver/create", data)
      .then((res) => {
        dispatch({
          type: CREATE_DRIVER_SUCCESS,
          payload: res.data,
        });

        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;

        dispatch({
          type: CREATE_DRIVER_FAIL,
          payload: message,
        });

        onError(message);
      });
  };

export const UploadDriverFile =
  (file, refId, fileType, companyId, email, onUploadProgress) =>
  (dispatch) =>
  (onSuccess) =>
  (onError) => {
    // const formdata = new FormData();
    // formdata.append("PicUrl", picFile);
    // formdata.append("LicenseUrl", docFile);

    let formData = new FormData();
    //alert(referenceId);
    formData.append("DriverId", refId);
    formData.append("FileType", fileType);
    formData.append("CompanyId", companyId);
    formData.append("Email", email);
    formData.append("file", file);

    dispatch({
      type: CREATE_DRIVER_REQUEST,
    });
    axios
      .post("/driver/updateFile", formData, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        onUploadProgress,
      })
      .then((res) => {
        dispatch({
          type: CREATE_DRIVER_SUCCESS,
          payload: res.data,
        });

        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;

        dispatch({
          type: CREATE_DRIVER_FAIL,
          payload: message,
        });

        onError(message);
      });
  };

export const editDriver =
  (form, driverId) => (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      CompanyId: form.CompanyId || "",
      DriverName: form.DriverName || "",
      Email: form.Email || "",
      Phone: form.Phone || "",
      Address: form.Address || "",
      City: form.City || "",
      Country: form.Country || "",
      Licensed: form.Licensed || "",
      LicenseUrl: form.LicenseUrl || "",
      Rating: form.Rating || "",
      DriverDocs: form.DriverDocs || "",
      PicUrl: form.PicUrl || null,
    };
    // console.log("requestPayload :>> ", form);
    let formData = new FormData();
    // if (file1 !== null) data.append("filePicUrl", file1);
    // if (file2 !== null) data.append("fileLicenseUrl", file2);
    // data.append("filePicUrl", file1);
    // data.append("fileLicenseUrl", file2);
    formData.append("DriverId", driverId);
    formData.append("CompanyId", form.CompanyId);
    formData.append("DriverName", form.DriverName);
    formData.append("Email", form.Email);
    formData.append("Phone", form.Phone);
    formData.append("DOB", form.DOB);
    formData.append("Address", form.Address);
    formData.append("City", form.City);
    formData.append("Region", form.Region);
    formData.append("Country", form.Country);
    formData.append("Licensed", form.Licensed);

    dispatch({
      type: EDIT_DRIVER_REQUEST,
    });

    axios
      .put(`/driver/update/${driverId}`, form)
      .then((res) => {
        dispatch({
          type: EDIT_DRIVER_SUCCESS,
          payload: res.data,
        });

        onSuccess(res.data);
      })
      .catch((err) => {
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({
          type: CREATE_DRIVER_FAIL,
          payload: message,
        });
        onError(message);
      });
  };

export const assignDriverToVehicle =
  (form, id) => (dispatch) => (onSuccess) => (onError) => {
    const requestPayload = {
      CompanyId: form.CompanyId || "",
      DriverName: form.DriverName || "",
      Email: form.Email || "",
      Phone: form.Phone || "",
      Address: form.Address || "",
      City: form.City || "",
      Country: form.Country || "",
      Licensed: form.Licensed || "",
      LicenseUrl: form.LicenseUrl || "",
      Rating: form.Rating || "",
      DriverDocs: form.DriverDocs || "",
      PicUrl: form.PicUrl || null,
    };

    //console.log("requestPayload :>> ", form);
    dispatch({
      type: CREATE_DRIVER_REQUEST,
    });

    axios
      .post(`/driver/AssignDriverToVehicle`, form)
      .then((res) => {
        dispatch({
          type: CREATE_DRIVER_SUCCESS,
          payload: res.data,
        });
        //  console.log("assignedResult", res.data);
      })
      .catch((err) => {
        // console.log("err", err.response);
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({
          type: CREATE_DRIVER_FAIL,
          payload: message,
        });
        onError(message);
      });
  };

export const sendDriverRegistrationLink =
  (form) => (dispatch) => (onSuccess) => (onError) => {
    //console.log("requestPayload :>> ", form);
    dispatch({
      type: CREATE_DRIVER_REQUEST,
    });

    axios
      .post(`/driver/sendDriverRegistrationLink`, form)
      .then((res) => {
        dispatch({
          type: CREATE_DRIVER_SUCCESS,
          payload: res.data,
        });
        console.log("form", form);
        onSuccess(res.data);
      })

      .catch((err) => {
        // console.log("err", err.response);
        const message = err.response ? err.response.data : CONNECTION_ERROR;
        dispatch({
          type: CREATE_DRIVER_FAIL,
          payload: message,
        });
        onError(message);
        console.log("message", message);
      });
  };

export const deleteDriver = (driverId) => async (dispatch) => {
  dispatch({ type: DELETE_DRIVER_REQUEST });

  try {
    const { res } = await axios.delete(`/driver/delete/${driverId}`);

    dispatch({
      type: DELETE_DRIVER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.message && error.message ? error.message : error.message;
    dispatch({ type: DELETE_DRIVER_FAIL, payload: message });
  }
};
