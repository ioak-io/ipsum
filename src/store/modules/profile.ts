const state = {
  darkmode: true,
  space: '',
  auth: {},
};

const getters = {
  getProfile: (state: any) => {
    return state;
  },
};

const actions = {
  toggleDarkmode({ commit }: any) {
    commit('UPDATE_PROFILE', { ...state, darkmode: !state.darkmode });
  },
  setSpace({ commit }: any, space: any) {
    commit('UPDATE_PROFILE', { ...state, space });
  },
  addAuth({ commit }: any, { auth, cookies }: any) {
    cookies?.set(`ipsum_${state.space}`, {
      isAuth: true,
      token: auth.token,
      secret: auth.secret,
      name: auth.name,
      email: auth.email,
    });
    commit('UPDATE_PROFILE', { ...state, auth: auth });
  },
  removeAuth({ commit }: any, cookies: any) {
    cookies.remove(`ipsum_${state.space}`);
    commit('UPDATE_PROFILE', { ...state, auth: {} });
  },
};

const mutations = {
  UPDATE_PROFILE: (state: any, profile: any) => {
    state.darkmode = profile.darkmode;
    state.space = profile.space;
    state.auth = profile.auth;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
