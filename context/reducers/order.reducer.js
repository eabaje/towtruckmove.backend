import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  EDIT_ORDER_REQUEST,
  EDIT_ORDER_SUCCESS,
  EDIT_ORDER_FAIL,
} from "../../constants/actionTypes";

const orders = (state, { type, payload }) => {
  switch (type) {
    case EDIT_ORDER_REQUEST: {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          loading: true,
          error: null,
        },
      };
    }

    case EDIT_ORDER_SUCCESS: {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          loading: false,
          error: null,
        },

        Orders: {
          ...state.Orders,
          loading: false,
          data: state.Orders.data.map((item) => {
            if (item.OrderId === payload.id) {
              return payload;
            } else {
              return item;
            }
          }),
          error: null,
        },
      };
    }

    case EDIT_ORDER_FAIL: {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          loading: false,
          error: null,
        },
      };
    }

    case DELETE_ORDER_REQUEST: {
      return {
        ...state,
        deleteOrder: {
          ...state.deleteOrder,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_ORDER_SUCCESS: {
      return {
        ...state,
        deleteOrder: {
          ...state.deleteOrder,
          loading: false,
          error: null,
        },

        Orders: {
          ...state.Orders,
          loading: false,
          data: state.Orders.data.filter((item) => item.OrderId !== payload),
          error: null,
        },
      };
    }

    case CREATE_ORDER_FAIL:
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          loading: false,
          error: null,
        },
      };
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          loading: true,
          error: null,
        },
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          loading: false,
          error: null,
          data: payload,
        },
      };

    case GET_ORDERS_REQUEST:
      return {
        ...state,
        Orders: {
          ...state.Orders,
          loading: true,
          error: null,
        },
      };

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        Orders: {
          ...state.Orders,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_ORDERS_FAIL:
      return {
        ...state,
        Orders: {
          ...state.Orders,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default orders;
