import axios from 'axios';
import { sendMessage, newMessageId } from '@/events/MessageService';
import store from '..';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  texts: [],
  burst: {
    sentences: [],
    paragraphs: [],
  },
};

const getters = {
  getSnippets: (state: any) => {
    return state.texts;
  },
  getSentences: (state: any) => {
    return state.burst.sentences;
  },
  getParagraphs: (state: any) => {
    return state.burst.paragraphs;
  },
};

const actions = {
  async fetchSnippets(
    { commit }: { commit: any },
    { language, unit, count, strategy }: any
  ) {
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: 'Randomizing text',
    });
    sendMessage('spinner');
    const response = await axios.get(
      `${baseUrl}/api/text/generate/${language}/${unit}?count=${count}&strategy=${strategy}`
    );
    sendMessage('spinner', false);
    sendMessage('notification', true, {
      id: messageId,
      type: 'success',
      message: 'Text generated',
      duration: 3000,
    });
    commit('UPDATE_TEXTS', response.data.data);
  },
  async preload(
    { commit }: { commit: any },
    { language, unit, strategy }: any
  ) {
    const response = await axios.get(
      `${baseUrl}/api/text/generate/${language}/${unit}?count=10&strategy=${strategy}`
    );
    commit(
      unit === 'sentence' ? 'UPDATE_BURST_SENTENCE' : 'UPDATE_BURST_PARAGRAPH',
      unit === 'sentence'
        ? [...state.burst.sentences, ...response.data.data]
        : [...state.burst.paragraphs, ...response.data.data]
    );
  },
  removeText({ commit }: any, { language, unit, strategy }: any) {
    if (unit === 'sentence') {
      commit('UPDATE_BURST_SENTENCE', state.burst.sentences.slice(1));
      if (state.burst.sentences.length < 6) {
        console.log('preload sentences...');
        store.dispatch('preload', { language, unit, strategy });
      }
    } else {
      commit('UPDATE_BURST_PARAGRAPH', state.burst.paragraphs.slice(1));
      if (state.burst.paragraphs.length < 6) {
        console.log('preload paragraphs...');
        store.dispatch('preload', { language, unit, strategy });
      }
    }
  },
};

const mutations = {
  UPDATE_TEXTS: (state: any, texts: any) => {
    state.texts = texts;
  },
  UPDATE_BURST_SENTENCE: (state: any, texts: any) => {
    state.burst.sentences = texts;
  },
  UPDATE_BURST_PARAGRAPH: (state: any, texts: any) => {
    state.burst.paragraphs = texts;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
