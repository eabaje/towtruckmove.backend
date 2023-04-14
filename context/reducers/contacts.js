import {
  CREATE_CONTACT_FAIL,
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  EDIT_CONTACT_REQUEST,
  EDIT_CONTACT_SUCCESS,
  EDIT_CONTACT_FAIL,
} from "../../constants/actionTypes";

const contacts = (state, { type, payload }) => {
  switch (type) {
    case EDIT_CONTACT_REQUEST: {
      return {
        ...state,
        createContact: {
          ...state.createContact,
          loading: true,
          error: null,
        },
      };
    }

    case EDIT_CONTACT_SUCCESS: {
      return {
        ...state,
        createContact: {
          ...state.createContact,
          loading: false,
          error: null,
        },

        getContacts: {
          ...state.getContacts,
          loading: false,
          data: state.getContacts.data.map((item) => {
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

    case EDIT_CONTACT_FAIL: {
      return {
        ...state,
        createContact: {
          ...state.createContact,
          loading: false,
          error: null,
        },
      };
    }

    case DELETE_CONTACT_REQUEST: {
      return {
        ...state,
        deleteContact: {
          ...state.deleteContact,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_CONTACT_SUCCESS: {
      return {
        ...state,
        deleteContact: {
          ...state.deleteContact,
          loading: false,
          error: null,
        },

        getContacts: {
          ...state.getContacts,
          loading: false,
          data: state.getContacts.data.filter((item) => item.id !== payload),
          error: null,
        },
      };
    }

    case CREATE_CONTACT_FAIL:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          loading: false,
          error: null,
        },
      };
    case CREATE_CONTACT_REQUEST:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          loading: true,
          error: null,
        },
      };
    case CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          loading: false,
          error: null,
          data: payload,
        },

        getContacts: {
          ...state.getContacts,
          loading: false,
          data: [payload, ...state.getContacts.data],
          error: null,
        },
      };

    case GET_CONTACTS_REQUEST:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          loading: true,
          error: null,
        },
      };

    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_CONTACTS_FAIL:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default contacts;
