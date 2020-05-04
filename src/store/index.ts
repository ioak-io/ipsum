import Vue from 'vue';
import Vuex from 'vuex';
import profile from '../store/modules/profile';
import text from './modules/text';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { profile, text },
});
