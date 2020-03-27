const state = {
  theme: '',
  space: '',
  auth: {},
};

const getters = {
  getProfile: (state: any) => {
    return state;
  },
};

const actions = {
  setTheme({ commit }: any, theme: any) {
    commit('UPDATE_PROFILE', { ...state, theme });
  },
  setSpace({ commit }: any, space: any) {
    commit('UPDATE_PROFILE', { ...state, space });
  },
  addAuth({ commit }: any, { auth, cookies }: any) {
    cookies?.set(`appnamehere_${state.space}`, {
      isAuth: true,
      token: auth.token,
      secret: auth.secret,
      name: auth.name,
      email: auth.email,
    });
    commit('UPDATE_PROFILE', { ...state, auth: auth });
  },
  removeAuth({ commit }: any, cookies: any) {
    cookies.remove(`appnamehere_${state.space}`);
    commit('UPDATE_PROFILE', { ...state, auth: {} });
  },
};

const mutations = {
  UPDATE_PROFILE: (state: any, profile: any) => {
    state.theme = profile.theme;
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
