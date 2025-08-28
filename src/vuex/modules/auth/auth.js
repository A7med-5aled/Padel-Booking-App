import mutations from "./mutations";
import actions from "./actions";
export default {
  namespaced: true,

  state() {
    return {
        isLoading:false,
        userId:null,
        refreshToken:null,
        tokenId:null,
        email:null,
        expiresIn:null,
        userBookings:null,
        userData:null,
    };
  },
  getters:{
    // userData(state){
    //     return {
    //         userId:state.userId,
    //         email:state.email,
    //         tokenId:state.tokenId,
    //         refreshToken:state.refreshToken,
    //         expiresIn:state.expiresIn,
    //     }

    // },
    isLoading(state){
      return state.isLoading;
    },
    userId(state){
      return state.userId;
    },
    isAuth(state){
      return !!state.userId;
    },
    getUserBookings(state){
      return state.userBookings;
    },
    getUserData(state){
      return state.userData;
    }
  },
  mutations,
  actions,
};
