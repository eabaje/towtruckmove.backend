import {
  CREATE_SUBSCRIBE_FAIL,
  CREATE_SUBSCRIBE_REQUEST,
  CREATE_SUBSCRIBE_SUCCESS,
  DELETE_SUBSCRIBE_REQUEST,
  DELETE_SUBSCRIBE_SUCCESS,
  GET_SUBSCRIBES_FAIL,
  GET_SUBSCRIBES_REQUEST,
  GET_SUBSCRIBES_SUCCESS,
  EDIT_SUBSCRIBE_REQUEST,
  EDIT_SUBSCRIBE_SUCCESS,
  EDIT_SUBSCRIBE_FAIL,
} from "../../constants/actionTypes";

const subscribe = (state, { type, payload }) => {
  switch (type) {
    case EDIT_SUBSCRIBE_REQUEST: {
      return {
        ...state,
        createSubscribe: {
          ...state.createSubscribe,
          loading: true,
          error: null,
        },
      };
    }

    case EDIT_SUBSCRIBE_SUCCESS: {
      return {
        ...state,
        createSubscribe: {
          ...state.createSubscribe,
          loading: false,
          error: null,
        },

        // Subscribes: {
        //   ...state.Subscribes,
        //   loading: false,
        //   data: state.Subscribes.data.map((item) => {
        //     if (item.SubscriptionId === payload.id) {
        //       return payload;
        //     } else {
        //       return item;
        //     }
        //   }),
        //   error: null,
        // },
      };
    }

    case EDIT_SUBSCRIBE_FAIL: {
      return {
        ...state,
        createSubscribe: {
          ...state.createSubscribe,
          loading: false,
          error: null,
        },
      };
    }

    case DELETE_SUBSCRIBE_REQUEST: {
      return {
        ...state,
        deleteSubscribe: {
          ...state.deleteSubscribe,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_SUBSCRIBE_SUCCESS: {
      return {
        ...state,
        deleteSubscribe: {
          ...state.deleteSubscribe,
          loading: false,
          error: null,
        },

        Subscribes: {
          ...state.Subscribes,
          loading: false,
          data: state.Subscribes.data.filter(
            (item) => item.SubscriptionId !== payload
          ),
          error: null,
        },
      };
    }

    case CREATE_SUBSCRIBE_FAIL:
      return {
        ...state,
        createSubscribe: {
          ...state.createSubscribe,
          loading: false,
          error: null,
        },
      };
    case CREATE_SUBSCRIBE_REQUEST:
      return {
        ...state,
        createSubscribe: {
          ...state.createSubscribe,
          loading: true,
          error: null,
        },
      };
    case CREATE_SUBSCRIBE_SUCCESS:
      console.log(`payload`, payload);

      return {
        ...state,
        createSubscribe: {
          ...state.createSubscribe,
          loading: false,
          error: null,
          data: payload,
        },
      };

    case GET_SUBSCRIBES_REQUEST:
      return {
        ...state,
        Subscribes: {
          ...state.Subscribes,
          loading: true,
          error: null,
        },
      };

    case GET_SUBSCRIBES_SUCCESS:
      return {
        ...state,
        Subscribes: {
          ...state.Subscribes,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_SUBSCRIBES_FAIL:
      return {
        ...state,
        Subscribes: {
          ...state.Subscribes,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default subscribe;
