import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home/Home.vue';
import Generate from '@/components/Generate/Generate.vue';

import { middlewarePipeline, readSpace } from './middleware';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: Home,
    name: 'Home',
    meta: { middleware: [readSpace] },
  },
  {
    path: '/generate',
    component: Generate,
    name: 'Generate',
    meta: { middleware: [readSpace] },
  },
  {
    path: '/',
    component: Home,
    name: 'Home',
    meta: { middleware: [readSpace] },
  },
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
