import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home/Home.vue';
import Listpage from '@/components/Listpage/Listpage.vue';
import CreateSpace from '@/components/Space/CreateSpace.vue';
import Login from '@/components/Auth/Login.vue';

import { middlewarePipeline, readSpace } from './middleware';

Vue.use(VueRouter);

const routes = [
  {
    path: '/:space/home',
    component: Home,
    name: 'Home',
    meta: { middleware: [readSpace] },
  },
  {
    path: '/:space/login',
    component: Login,
    name: 'Login',
    meta: { middleware: [readSpace] },
  },
  {
    path: '/:space/listpage',
    component: Listpage,
    name: 'Listpage',
    meta: { middleware: [readSpace] },
  },
  { path: '/createspace', component: CreateSpace, name: 'CreateSpace' },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
