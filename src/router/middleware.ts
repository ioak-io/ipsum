import store from '@/store/index';

export function middlewarePipeline(context: any, middleware: any, index: any) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);

    nextMiddleware({ ...context, next: nextPipeline });
  };
}

export function readSpace({ to, from, next }: any) {
  if (!to.params.space) {
    console.log('space not selected error page');
  }
  store.dispatch('setSpace', to.params.space);
  next();
}
