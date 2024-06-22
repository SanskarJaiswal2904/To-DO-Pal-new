import { defineStore } from 'pinia';

export const useTaskStore = defineStore('userInfo', {
  state: () => ({
    isLoggedIn: false,
    user: {
      _id: '',
      name: '',
      email: '',
      gender: '',
      isAdmin: false
    }
  }),
  getters: {
    checkLogin(state) {
      return state.isLoggedIn;
    },
    userInfo: (state) => state.user, // Define userInfo as a property getter
    printuser(state) {
      console.log(state.user),
      console.log(state.user.name),
      console.log(state.user.email),
      console.log(state.user.gender),
      console.log(state.user.isAdmin)
    }
  },
  actions: {
    logIn(user) {
      this.isLoggedIn = true;
      this.user = {
        _id: user._id.$oid, 
        name: user.name,
        email: user.email,
        gender: user.gender,
        isAdmin: user.isAdmin
      };
    },
    logOut() {
      this.isLoggedIn = false;
      this.user = {
        _id: '',
        name: '',
        email: '',
        gender: '',
        isAdmin: false
      };
    },
    setUserInfo(user) {
      this.user = { ...user };
    },
  }
});
