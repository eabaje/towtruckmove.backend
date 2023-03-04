import {
  CREATE_USER_SUBSCRIPTION_FAIL,
  CREATE_USER_SUBSCRIPTION_REQUEST,
  CREATE_USER_SUBSCRIPTION_SUCCESS,
  DELETE_USER_SUBSCRIPTION_REQUEST,
  DELETE_USER_SUBSCRIPTION_SUCCESS,
  GET_USER_SUBSCRIPTIONS_FAIL,
  GET_USER_SUBSCRIPTIONS_REQUEST,
  GET_USER_SUBSCRIPTIONS_SUCCESS,
  EDIT_USER_SUBSCRIPTION_REQUEST,
  EDIT_USER_SUBSCRIPTION_SUCCESS,
  EDIT_USER_SUBSCRIPTION_FAIL,
  UPGRADE_USER_SUBSCRIPTION_REQUEST,
  UPGRADE_USER_SUBSCRIPTION_SUCCESS,
  UPGRADE_USER_SUBSCRIPTION_FAIL,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  // DELETE_USER_FAIL,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
  GET_COMPANYS_REQUEST,
  GET_COMPANYS_SUCCESS,
  GET_COMPANYS_FAIL,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_FAIL,
  EDIT_COMPANY_REQUEST,
  EDIT_COMPANY_SUCCESS,
  EDIT_COMPANY_FAIL,
  DELETE_USER_FAIL,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  POP_UP_SHOW,
  POP_UP_CLOSE,
} from "../../constants/actionTypes";

const user = (state, { type, payload }) => {
  switch (type) {
    case EDIT_USER_SUBSCRIPTION_REQUEST: {
      return {
        ...state,
        createUserSubscription: {
          ...state.createUserSubscription,
          loading: true,
          error: null,
        },
      };
    }

    case EDIT_USER_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        createUserSubscription: {
          ...state.createUserSubscription,
          loading: false,
          error: null,
        },

        UserSubscriptions: {
          ...state.UserSubscriptions,
          loading: false,
          data: state.UserSubscriptions.data.map((item) => {
            if (item.SubscriptionId === payload.id) {
              return payload;
            } else {
              return item;
            }
          }),
          error: null,
        },
      };
    }

    case EDIT_USER_SUBSCRIPTION_FAIL: {
      return {
        ...state,
        createUserSubscription: {
          ...state.createUserSubscription,
          loading: false,
          error: null,
        },
      };
    }

    case DELETE_USER_SUBSCRIPTION_REQUEST: {
      return {
        ...state,
        deleteUserSubscription: {
          ...state.deleteUserSubscription,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_USER_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        deleteUserSubscription: {
          ...state.deleteUserSubscription,
          loading: false,
          error: null,
        },

        UserSubscriptions: {
          ...state.UserSubscriptions,
          loading: false,
          data: state.UserSubscriptions.data.filter(
            (item) => item.SubscriptionId !== payload
          ),
          error: null,
        },
      };
    }

    case CREATE_USER_SUBSCRIPTION_FAIL:
      return {
        ...state,
        createUserSubscription: {
          ...state.createUserSubscription,
          loading: false,
          error: null,
        },
      };
    case CREATE_USER_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        createUserSubscription: {
          ...state.createUserSubscription,
          loading: true,
          error: null,
        },
      };
    case CREATE_USER_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        createUserSubscription: {
          ...state.createUserSubscription,
          loading: false,
          error: null,
          data: payload,
        },

        UserSubscriptions: {
          ...state.UserSubscriptions,
          loading: false,
          data: [payload, ...state.UserSubscriptions.data],
          error: null,
        },
      };

    case GET_USER_SUBSCRIPTIONS_REQUEST:
      return {
        ...state,
        UserSubscriptions: {
          ...state.UserSubscriptions,
          loading: true,
          error: null,
        },
      };

    case GET_USER_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        UserSubscriptions: {
          ...state.UserSubscriptions,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_USER_SUBSCRIPTIONS_FAIL:
      return {
        ...state,
        UserSubscriptions: {
          ...state.UserSubscriptions,
          loading: false,
          error: payload,
        },
      };

    case UPGRADE_USER_SUBSCRIPTION_FAIL:
      return {
        ...state,
        upgradeUserSubscription: {
          ...state.upgradeUserSubscription,
          loading: false,
          error: null,
        },
      };
    case UPGRADE_USER_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        upgradeUserSubscription: {
          ...state.upgradeUserSubscription,
          loading: true,
          error: null,
        },
      };
    case UPGRADE_USER_SUBSCRIPTION_SUCCESS:
      // console.log(`payload`, payload)

      return {
        ...state,
        upgradeUserSubscription: {
          ...state.upgradeUserSubscription,
          loading: false,
          error: null,
          data: payload,
        },

        UserSubscriptions: {
          ...state.UserSubscriptions,
          loading: false,
          data: [payload, ...state.UserSubscriptions.data],
          error: null,
        },
      };

    case EDIT_USER_REQUEST:
      return {
        ...state,
        createUser: {
          ...state.createUser,
          loading: true,
          error: null,
        },
      };

    case EDIT_USER_SUCCESS:
      return {
        ...state,
        createUser: {
          ...state.createUser,
          loading: false,
          error: null,
        },

        Users: {
          ...state.Users,
          loading: false,
          data: state.Users.data.map((item) => {
            if (item.Id === payload.id) {
              return payload;
            } else {
              return item;
            }
          }),
          error: null,
        },
      };

    case EDIT_USER_FAIL:
      return {
        ...state,
        createUser: {
          ...state.createUser,
          loading: false,
          error: null,
        },
      };

    case DELETE_USER_REQUEST: {
      return {
        ...state,
        deleteUser: {
          ...state.deleteUser,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        deleteUser: {
          ...state.deleteUser,
          loading: false,
          error: null,
        },

        Users: {
          ...state.Users,
          loading: false,
          data: state.Users.data.filter((item) => item.Id !== payload),
          error: null,
        },
      };
    }
    case DELETE_USER_FAIL:
      return {
        ...state,
        deleteUser: {
          ...state.deleteUser,
          loading: false,
          error: null,
        },
      };

    case CREATE_USER_FAIL:
      return {
        ...state,
        createUser: {
          ...state.createUser,
          loading: false,
          error: null,
        },
      };
    case CREATE_USER_REQUEST:
      return {
        ...state,
        createUser: {
          ...state.createUser,
          loading: true,
          error: null,
        },
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        createUser: {
          ...state.createUser,
          loading: false,
          error: null,
          data: payload,
        },
      };

    case GET_USERS_REQUEST:
      return {
        ...state,
        Users: {
          ...state.Users,
          loading: true,
          error: null,
        },
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        Users: {
          ...state.Users,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_USERS_FAIL:
      return {
        ...state,
        Users: {
          ...state.Users,
          loading: false,
          error: payload,
        },
      };

    case GET_USER_REQUEST:
      return {
        ...state,
        User: {
          ...state.User,
          loading: true,
          error: null,
        },
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        User: {
          ...state.User,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_USER_FAIL:
      return {
        ...state,
        User: {
          ...state.User,
          loading: false,
          error: payload,
        },
      };

    case GET_COMPANYS_REQUEST:
      return {
        ...state,
        Companys: {
          ...state.Companys,
          loading: true,
          error: null,
        },
      };

    case GET_COMPANYS_SUCCESS:
      return {
        ...state,
        Companys: {
          ...state.Companys,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_COMPANYS_FAIL:
      return {
        ...state,
        Companys: {
          ...state.Companys,
          loading: false,
          error: payload,
        },
      };

    case CREATE_COMPANY_FAIL:
      return {
        ...state,
        createCompany: {
          ...state.createCompany,
          loading: false,
          error: null,
        },
      };
    case CREATE_COMPANY_REQUEST:
      return {
        ...state,
        createCompany: {
          ...state.createCompany,
          loading: true,
          error: null,
        },
      };
    case CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        createCompany: {
          ...state.createCompany,
          loading: false,
          error: null,
          data: payload,
        },
      };

    case EDIT_COMPANY_REQUEST:
      return {
        ...state,
        createCompany: {
          ...state.createCompany,
          loading: true,
          error: null,
        },
      };

    case EDIT_COMPANY_SUCCESS:
      return {
        ...state,
        createCompany: {
          ...state.createCompany,
          loading: false,
          error: null,
        },
      };

    case EDIT_COMPANY_FAIL:
      return {
        ...state,
        createCompany: {
          ...state.createCompany,
          loading: false,
          error: null,
        },
      };

    case DELETE_COMPANY_REQUEST: {
      return {
        ...state,
        deleteCompany: {
          ...state.deleteCompany,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_COMPANY_SUCCESS: {
      return {
        ...state,
        deleteCompany: {
          ...state.deleteCompany,
          loading: false,
          error: null,
        },

        Companys: {
          ...state.Companys,
          loading: false,
          data: state.Companys.data.filter((item) => item.Id !== payload),
          error: null,
        },
      };
    }
    case DELETE_COMPANY_FAIL:
      return {
        ...state,
        deleteCompany: {
          ...state.deleteCompany,
          loading: false,
          error: null,
        },
      };

    case POP_UP_SHOW:
      return {
        ...state,
        popUpOverLay: {
          open: true,
        },
      };
    case POP_UP_CLOSE:
      return {
        ...state,
        popUpOverLay: {
          ...state.popUpOverLay,
          open: false,
        },
      };

    default:
      return state;
  }
};

export default user;
