import {
  CLEAR_AUTH_STATE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../../constants/actionTypes";

const auth = (state, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));

      return {
        ...state,
        loading: false,
        user: payload.user,
        isLoggedIn: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        user: null,
        isLoggedIn: false,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_AUTH_STATE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
        error: null,
      };

    default:
      return state;
  }
};

export default auth;
