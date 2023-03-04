import {
  CREATE_TRIP_FAIL,
  CREATE_TRIP_REQUEST,
  CREATE_TRIP_SUCCESS,
  DELETE_TRIP_REQUEST,
  DELETE_TRIP_SUCCESS,
  GET_TRIPS_FAIL,
  GET_TRIPS_REQUEST,
  GET_TRIPS_SUCCESS,
  EDIT_TRIP_REQUEST,
  EDIT_TRIP_SUCCESS,
  EDIT_TRIP_FAIL,
} from "../../constants/actionTypes";

const trips = (state, { type, payload }) => {
  switch (type) {
    case EDIT_TRIP_REQUEST: {
      return {
        ...state,
        createTrip: {
          ...state.createTrip,
          loading: true,
          error: null,
        },
      };
    }

    case EDIT_TRIP_SUCCESS: {
      return {
        ...state,
        createTrip: {
          ...state.createTrip,
          loading: false,
          error: null,
        },

        Trips: {
          ...state.Trips,
          loading: false,
          data: state.Trips.data.map((item) => {
            if (item.TripdId === payload.id) {
              return payload;
            } else {
              return item;
            }
          }),
          error: null,
        },
      };
    }

    case EDIT_TRIP_FAIL: {
      return {
        ...state,
        createTrip: {
          ...state.createTrip,
          loading: false,
          error: null,
        },
      };
    }

    case DELETE_TRIP_REQUEST: {
      return {
        ...state,
        deleteTrip: {
          ...state.deleteTrip,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_TRIP_SUCCESS: {
      return {
        ...state,
        deleteTrip: {
          ...state.deleteTrip,
          loading: false,
          error: null,
        },

        Trips: {
          ...state.Trips,
          loading: false,
          data: state.Trips.data.filter((item) => item.TripdId !== payload),
          error: null,
        },
      };
    }

    case CREATE_TRIP_FAIL:
      return {
        ...state,
        createTrip: {
          ...state.createTrip,
          loading: false,
          error: null,
        },
      };
    case CREATE_TRIP_REQUEST:
      return {
        ...state,
        createTrip: {
          ...state.createTrip,
          loading: true,
          error: null,
        },
      };
    case CREATE_TRIP_SUCCESS:
      return {
        ...state,
        createTrip: {
          ...state.createTrip,
          loading: false,
          error: null,
          data: payload,
        },
      };

    case GET_TRIPS_REQUEST:
      return {
        ...state,
        Trips: {
          ...state.Trips,
          loading: true,
          error: null,
        },
      };

    case GET_TRIPS_SUCCESS:
      return {
        ...state,
        Trips: {
          ...state.Trips,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_TRIPS_FAIL:
      return {
        ...state,
        Trips: {
          ...state.Trips,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default trips;
