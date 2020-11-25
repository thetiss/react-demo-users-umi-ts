import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';


export default defineConfig({
    nodeModulesTransform: {
      type: 'none',
    },
    dva: { // 内置 dva，默认版本是 ^2.6.0-beta.20，如果项目中有依赖，会优先使用项目中依赖的版本。
      immer: true, // 表示是否启用 immer 以方便修改 reducer。
      hmr: false, // 表示是否启用 dva model 的热更新。
    },
    antd: {
      dark: false,
    },
    proxy,
    routes,
  });