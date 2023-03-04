import {
  CREATE_ASSIGN_DRIVER_FAIL,
  CREATE_ASSIGN_DRIVER_REQUEST,
  CREATE_ASSIGN_DRIVER_SUCCESS,
  DELETE_ASSIGN_DRIVER_REQUEST,
  DELETE_ASSIGN_DRIVER_SUCCESS,
  GET_ASSIGN_DRIVERS_FAIL,
  GET_ASSIGN_DRIVERS_REQUEST,
  GET_ASSIGN_DRIVERS_SUCCESS,
  EDIT_ASSIGN_DRIVER_REQUEST,
  EDIT_ASSIGN_DRIVER_SUCCESS,
  EDIT_ASSIGN_DRIVER_FAIL,
} from "../../constants/actionTypes";

const assigndriver = (state, { type, payload }) => {
  switch (type) {
    case EDIT_ASSIGN_DRIVER_REQUEST: {
      return {
        ...state,
        createAssignedDriver: {
          ...state.createAssignedDriver,
          loading: true,
          error: null,
        },
      };
    }

    case EDIT_ASSIGN_DRIVER_SUCCESS: {
      return {
        ...state,
        createAssignedDriver: {
          ...state.createAssignedDriver,
          loading: false,
          error: null,
        },

        AssignedDrivers: {
          ...state.getAssign_Drivers,
          loading: false,
          data: state.AssignedDrivers.data.map((item) => {
            if (item.AssignId === payload.id) {
              return payload;
            } else {
              return item;
            }
          }),
          error: null,
        },
      };
    }

    case EDIT_ASSIGN_DRIVER_FAIL: {
      return {
        ...state,
        createAssignedDriver: {
          ...state.createAssignedDriver,
          loading: false,
          error: null,
        },
      };
    }

    case DELETE_ASSIGN_DRIVER_REQUEST: {
      return {
        ...state,
        deleteAssignedDriver: {
          ...state.deleteAssignedDriver,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_ASSIGN_DRIVER_SUCCESS: {
      return {
        ...state,
        deleteAssign_Driver: {
          ...state.deleteAssignedDriver,
          loading: false,
          error: null,
        },

        getAssign_Drivers: {
          ...state.getAssign_Drivers,
          loading: false,
          data: state.AssignedDrivers.data.filter(
            (item) => item.AssignId !== payload
          ),
          error: null,
        },
      };
    }

    case CREATE_ASSIGN_DRIVER_FAIL:
      return {
        ...state,
        createAssign_Driver: {
          ...state.createAssignedDriver,
          loading: false,
          error: null,
        },
      };
    case CREATE_ASSIGN_DRIVER_REQUEST:
      return {
        ...state,
        createAssign_Driver: {
          ...state.createAssignedDriver,
          loading: true,
          error: null,
        },
      };
    case CREATE_ASSIGN_DRIVER_SUCCESS:
      return {
        ...state,
        createAssign_Driver: {
          ...state.createAssignedDriver,
          loading: false,
          error: null,
          data: payload,
        },
      };

    case GET_ASSIGN_DRIVERS_REQUEST:
      return {
        ...state,
        getAssign_Drivers: {
          ...state.AssignedDrivers,
          loading: true,
          error: null,
        },
      };

    case GET_ASSIGN_DRIVERS_SUCCESS:
      return {
        ...state,
        getAssign_Drivers: {
          ...state.AssignedDrivers,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_ASSIGN_DRIVERS_FAIL:
      return {
        ...state,
        getAssign_Drivers: {
          ...state.AssignedDrivers,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default assigndriver;
