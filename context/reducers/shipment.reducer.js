import {
  CREATE_SHIPMENT_FAIL,
  CREATE_SHIPMENT_REQUEST,
  CREATE_SHIPMENT_SUCCESS,
  DELETE_SHIPMENT_REQUEST,
  DELETE_SHIPMENT_SUCCESS,
  GET_SHIPMENTS_FAIL,
  GET_SHIPMENTS_REQUEST,
  GET_SHIPMENTS_SUCCESS,
  EDIT_SHIPMENT_REQUEST,
  EDIT_SHIPMENT_SUCCESS,
  EDIT_SHIPMENT_FAIL,
  GET_INTERESTS_SUCCESS,
  GET_INTERESTS_REQUEST,
  GET_INTERESTS_FAIL,
  GET_SHIPMENT_SUCCESS,
  GET_SHIPMENT_FAIL,
  GET_SHIPMENT_REQUEST,
} from "../../constants/actionTypes";

const shipments = (state, { type, payload }) => {
  switch (type) {
    case EDIT_SHIPMENT_REQUEST: {
      return {
        ...state,
        createShipment: {
          ...state.createShipment,
          loading: true,
          error: null,
        },
      };
    }

    case EDIT_SHIPMENT_SUCCESS: {
      return {
        ...state,
        createShipment: {
          ...state.createShipment,
          loading: false,
          error: null,
        },

        // Shipments: {
        //   ...state.Shipments,
        //   loading: false,
        //   data: state.Shipments.data.map((item) => {
        //     if (item.ShipmentId === payload.id) {
        //       return payload;
        //     } else {
        //       return item;
        //     }
        //   }),
        //   error: null,
        // },
      };
    }

    case EDIT_SHIPMENT_FAIL: {
      return {
        ...state,
        createShipment: {
          ...state.createShipment,
          loading: false,
          error: null,
        },
      };
    }

    case DELETE_SHIPMENT_REQUEST: {
      return {
        ...state,
        deleteShipment: {
          ...state.deleteShipment,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_SHIPMENT_SUCCESS: {
      return {
        ...state,
        deleteShipment: {
          ...state.deleteShipment,
          loading: false,
          error: null,
        },

        Shipments: {
          ...state.Shipments,
          loading: false,
          data: state.Shipments.data.filter(
            (item) => item.ShipmentId !== payload
          ),
          error: null,
        },
      };
    }

    case CREATE_SHIPMENT_FAIL:
      return {
        ...state,
        createShipment: {
          ...state.createShipment,
          loading: false,
          error: null,
        },
      };
    case CREATE_SHIPMENT_REQUEST:
      return {
        ...state,
        createShipment: {
          ...state.createShipment,
          loading: true,
          error: null,
        },
      };
    case CREATE_SHIPMENT_SUCCESS:
      return {
        ...state,
        createShipment: {
          ...state.createShipment,
          loading: false,
          error: null,
          data: payload,
        },

        // Shipments: {
        //   ...state.Shipments,
        //   loading: false,
        //   data: [payload, ...state.Shipments.data],
        //   error: null,
        // },
      };

    case GET_SHIPMENTS_REQUEST:
      return {
        ...state,
        Shipments: {
          ...state.Shipments,
          loading: true,
          error: null,
        },
      };

    case GET_SHIPMENTS_SUCCESS:
      return {
        ...state,
        Shipments: {
          ...state.Shipments,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_SHIPMENTS_FAIL:
      return {
        ...state,
        Shipments: {
          ...state.Shipments,
          loading: false,
          error: payload,
        },
      };

    case GET_SHIPMENT_REQUEST:
      return {
        ...state,
        Shipment: {
          ...state.Shipment,
          loading: true,
          error: null,
        },
      };

    case GET_SHIPMENT_SUCCESS:
      return {
        ...state,
        Shipment: {
          ...state.Shipment,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_SHIPMENT_FAIL:
      return {
        ...state,
        Shipment: {
          ...state.Shipment,
          loading: false,
          error: payload,
        },
      };
    case GET_INTERESTS_REQUEST:
      return {
        ...state,
        Interests: {
          ...state.Interests,
          loading: true,
          error: null,
        },
      };

    case GET_INTERESTS_SUCCESS:
      return {
        ...state,
        Interests: {
          ...state.Interests,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_INTERESTS_FAIL:
      return {
        ...state,
        Interests: {
          ...state.Interests,
          loading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default shipments;
