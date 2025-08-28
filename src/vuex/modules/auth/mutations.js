import router from "../../../router/router";

export default {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.tokenId = payload.tokenId;
    state.expiresIn = payload.expiresIn;
    state.email = payload.email;
    state.refreshToken = payload.refreshToken;
  },
  logout(state) {
    state.userId = null;
    state.tokenId = null;
    state.expiresIn = null;
    state.email = null;
    state.refreshToken = null;
    localStorage.removeItem("tokenData");
    localStorage.removeItem("userData");
    localStorage.removeItem("userBookings");

    router.replace("/login");
  },
  loading(state) {
    state.isLoading = true;
  },
  stopLoading(state) {
    state.isLoading = false;
  },
  setUserBookings(state, bookings) {
    state.userBookings = bookings;
  },
  setUserData(state, userData) {
    state.userData = userData;
  },
};
