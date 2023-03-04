import {
  CREATE_DRIVER_FAIL,
  CREATE_DRIVER_REQUEST,
  CREATE_DRIVER_SUCCESS,
  DELETE_DRIVER_REQUEST,
  DELETE_DRIVER_SUCCESS,
  GET_DRIVERS_FAIL,
  GET_DRIVERS_REQUEST,
  GET_DRIVERS_SUCCESS,
  EDIT_DRIVER_REQUEST,
  EDIT_DRIVER_SUCCESS,
  EDIT_DRIVER_FAIL,
  GET_DRIVER_REQUEST,
  GET_DRIVER_SUCCESS,
  GET_DRIVER_FAIL,
} from "../../constants/actionTypes";

const drivers = (state, { type, payload }) => {
  switch (type) {
    case EDIT_DRIVER_REQUEST: {
      return {
        ...state,
        createDriver: {
          ...state.createDriver,
          loading: true,
          error: null,
        },
      };
    }

    case EDIT_DRIVER_SUCCESS: {
      return {
        ...state,
        createDriver: {
          ...state.createDriver,
          loading: false,
          error: null,
        },

       
      };
    }

    case EDIT_DRIVER_FAIL: {
      return {
        ...state,
        createDriver: {
          ...state.createDriver,
          loading: false,
          error: null,
        },
      };
    }

    case DELETE_DRIVER_REQUEST: {
      return {
        ...state,
        deleteDriver: {
          ...state.deleteDriver,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_DRIVER_SUCCESS: {
      return {
        ...state,
        deleteDriver: {
          ...state.deleteDriver,
          loading: false,
          error: null,
        },

        Drivers: {
          ...state.Drivers,
          loading: false,
          data: state.Drivers.data.filter((item) => item.DriverId !== payload),
          error: null,
        },
      };
    }

    case CREATE_DRIVER_FAIL:
      return {
        ...state,
        createDriver: {
          ...state.createDriver,
          loading: false,
          error: null,
        },
      };
    case CREATE_DRIVER_REQUEST:
      return {
        ...state,
        createDriver: {
          ...state.createDriver,
          loading: true,
          error: null,
        },
      };
    case CREATE_DRIVER_SUCCESS:
      return {
        ...state,
        createDriver: {
          ...state.createDriver,
          loading: false,
          error: null,
          data: payload,
        },
      };

    case GET_DRIVERS_REQUEST:
      return {
        ...state,
        Drivers: {
          ...state.Drivers,
          loading: true,
          error: null,
        },
      };

    case GET_DRIVERS_SUCCESS:
      return {
        ...state,
        Drivers: {
          ...state.Drivers,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_DRIVERS_FAIL:
      return {
        ...state,
        Drivers: {
          ...state.Drivers,
          loading: false,
          error: payload,
        },
      };

    case GET_DRIVER_REQUEST:
      return {
        ...state,
        Driver: {
          ...state.Driver,
          loading: true,
          error: null,
        },
      };

    case GET_DRIVER_SUCCESS:
      return {
        ...state,
        Driver: {
          ...state.Driver,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_DRIVER_FAIL:
      return {
        ...state,
        Driver: {
          ...state.Driver,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default drivers;
