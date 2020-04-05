import axios from 'axios';
import { sendMessage, newMessageId } from '@/events/MessageService';

const state = {
  tasks: [],
};

const getters = {
  getSnippets: (state: any) => {
    return state.tasks;
  },
};

const actions = {
  async fetchSnippets({ commit }: { commit: any }, count: number) {
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: 'Randomizing text',
    });
    sendMessage('spinner');
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=${count}`
      // 'https://jsonplaceholder.typicode.com/posts'
    );
    sendMessage('spinner', false);
    sendMessage('notification', true, {
      id: messageId,
      type: 'success',
      message: 'Text generated',
      duration: 3000,
    });
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
