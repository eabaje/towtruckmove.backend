import {
  CREATE_LOAD_FAIL,
  CREATE_LOAD_REQUEST,
  CREATE_LOAD_SUCCESS,
  DELETE_LOAD_REQUEST,
  DELETE_LOAD_SUCCESS,
  GET_LOADS_FAIL,
  GET_LOADS_REQUEST,
  GET_LOADS_SUCCESS,
  EDIT_LOAD_REQUEST,
  EDIT_LOAD_SUCCESS,
  EDIT_LOAD_FAIL,
} from "../../constants/actionTypes";

const loads = (state, { type, payload }) => {
  switch (type) {
    case EDIT_LOAD_REQUEST: {
      return {
        ...state,
        createLoad: {
          ...state.createLoad,
          loading: true,
          error: null,
        },
      };
    }

    case EDIT_LOAD_SUCCESS: {
      return {
        ...state,
        createLoad: {
          ...state.createLoad,
          loading: false,
          error: null,
        },

        getLoads: {
          ...state.getLoads,
          loading: false,
          data: state.getLoads.data.map((item) => {
            if (item.id === payload.id) {
              return payload;
            } else {
              return item;
            }
          }),
          error: null,
        },
      };
    }

    case EDIT_LOAD_FAIL: {
      return {
        ...state,
        createLoad: {
          ...state.createLoad,
          loading: false,
          error: null,
        },
      };
    }

    case DELETE_LOAD_REQUEST: {
      return {
        ...state,
        deleteLoad: {
          ...state.deleteLoad,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_LOAD_SUCCESS: {
      return {
        ...state,
        deleteLoad: {
          ...state.deleteLoad,
          loading: false,
          error: null,
        },

        getLoads: {
          ...state.getLoads,
          loading: false,
          data: state.getLoads.data.filter((item) => item.id !== payload),
          error: null,
        },
      };
    }

    case CREATE_LOAD_FAIL:
      return {
        ...state,
        createLoad: {
          ...state.createLoad,
          loading: false,
          error: null,
        },
      };
    case CREATE_LOAD_REQUEST:
      return {
        ...state,
        createLoad: {
          ...state.createLoad,
          loading: true,
          error: null,
        },
      };
    case CREATE_LOAD_SUCCESS:
      return {
        ...state,
        createLoad: {
          ...state.createLoad,
          loading: false,
          error: null,
          data: payload,
        },
      };

    case GET_LOADS_REQUEST:
      return {
        ...state,
        getLoads: {
          ...state.getLoads,
          loading: true,
          error: null,
        },
      };

    case GET_LOADS_SUCCESS:
      return {
        ...state,
        getLoads: {
          ...state.getLoads,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_LOADS_FAIL:
      return {
        ...state,
        getLoads: {
          ...state.getLoads,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default loads;
