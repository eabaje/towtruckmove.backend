export default {
  isLoggedIn: false,
  user:(typeof window !== 'undefined')? JSON.parse(localStorage.getItem("user")) : {},
  error: null,
  loading: false,
};
