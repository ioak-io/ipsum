import axios from 'axios';

const state = {
  tasks: [],
};

const getters = {
  getTasks: (state: any) => {
    return state.tasks;
  },
};

const actions = {
  async fetchTasks({ commit }: { commit: any }) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    commit('UPDATE_TASKS', response.data);
  },
};

const mutations = {
  UPDATE_TASKS: (state: any, tasks: any) => {
    state.tasks = tasks;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
