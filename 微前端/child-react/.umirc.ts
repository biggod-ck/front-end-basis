import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  base: '/react/',
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
