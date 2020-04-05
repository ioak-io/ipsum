import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from '@/components/App/App.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

describe('App.vue', () => {
  let getters;
  let store: any;

  beforeEach(() => {
    getters = {
      getProfile: () => {
        return {
          space: 'teststace',
        };
      },
    };
    store = new Vuex.Store({
      getters,
    });
  });
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(App, {
      store,
      localVue,
      router,
      propsData: { msg },
    });
    expect(wrapper.contains('#app')).toBeTruthy();
  });
});
