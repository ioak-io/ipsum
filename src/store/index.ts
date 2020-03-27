import Vue from 'vue';
import Vuex from 'vuex';
import profile from '../store/modules/profile';
import task from '../store/modules/task';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { profile, task },
});
