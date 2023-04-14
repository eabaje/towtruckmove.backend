import {
  CREATE_VEHICLE_FAIL,
  CREATE_VEHICLE_REQUEST,
  CREATE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_REQUEST,
  DELETE_VEHICLE_SUCCESS,
  GET_VEHICLES_FAIL,
  GET_VEHICLES_REQUEST,
  GET_VEHICLES_SUCCESS,
  EDIT_VEHICLE_REQUEST,
  EDIT_VEHICLE_SUCCESS,
  EDIT_VEHICLE_FAIL,
} from "../../constants/actionTypes";

const vehicles = (state, { type, payload }) => {
  switch (type) {
    case EDIT_VEHICLE_REQUEST: {
      return {
        ...state,
        createVehicle: {
          ...state.createVehicle,
          loading: true,
          error: null,
        },
      };
    }

    case EDIT_VEHICLE_SUCCESS: {
      return {
        ...state,
        createVehicle: {
          ...state.createVehicle,
          loading: false,
          error: null,
        },

        // Vehicles: {
        //   ...state.Vehicles,
        //   loading: false,
        //   data: state.Vehicles.data.map((item) => {
        //     if (item.VehicleId === payload.id) {
        //       return payload;
        //     } else {
        //       return item;
        //     }
        //   }),
        //   error: null,
        // },
      };
    }

    case EDIT_VEHICLE_FAIL: {
      return {
        ...state,
        createVehicle: {
          ...state.createVehicle,
          loading: false,
          error: null,
        },
      };
    }

    case DELETE_VEHICLE_REQUEST: {
      return {
        ...state,
        deleteVehicle: {
          ...state.deleteVehicle,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_VEHICLE_SUCCESS: {
      return {
        ...state,
        deleteVehicle: {
          ...state.deleteVehicle,
          loading: false,
          error: null,
        },

        Vehicles: {
          ...state.Vehicles,
          loading: false,
          data: state.Vehicles.data.filter(
            (item) => item.VehicleId !== payload
          ),
          error: null,
        },
      };
    }

    case CREATE_VEHICLE_FAIL:
      return {
        ...state,
        createVehicle: {
          ...state.createVehicle,
          loading: false,
          error: null,
        },
      };
    case CREATE_VEHICLE_REQUEST:
      return {
        ...state,
        createVehicle: {
          ...state.createVehicle,
          loading: true,
          error: null,
        },
      };
    case CREATE_VEHICLE_SUCCESS:
      return {
        ...state,
        createVehicle: {
          ...state.createVehicle,
          loading: false,
          error: null,
          data: payload,
        },

        // Vehicle: {
        //   ...state.Vehicles,
        //   loading: false,
        //   data: [payload, ...state.Vehicle.data],
        //   error: null,
        // },
      };

    case GET_VEHICLES_REQUEST:
      return {
        ...state,
        Vehicles: {
          ...state.Vehicles,
          loading: true,
          error: null,
        },
      };

    case GET_VEHICLES_SUCCESS:
      return {
        ...state,
        Vehicles: {
          ...state.Vehicles,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_VEHICLES_FAIL:
      return {
        ...state,
        Vehicles: {
          ...state.Vehicles,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default vehicles;
