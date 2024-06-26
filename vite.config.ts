import type { UserConfig } from 'vite'
import { defineConfig, PluginOption } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import AutoRegistryComponents from 'unplugin-vue-components/vite'
// import VisualizerPlugin from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig((): UserConfig => {
  const isBuild = process.env.NODE_ENV === 'production'
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // 按需加载，自动引入
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dts: 'types/auto-imports.d.ts',
      vueTemplate: true
    }),
    // 自动按需引入组件(注意：需注册至 uni 之前，否则不会生效)
    AutoRegistryComponents({
      dts: 'types/components.d.ts'
    }),
    // https://github.com/antfu/unocss
    Unocss(),
    uni()
  ]
  if (isBuild) {
    const buildPlugins: (PluginOption | PluginOption[])[] = [
      // 打包视图分析
      // VisualizerPlugin()
    ]
    vitePlugins.push(...buildPlugins)
  }
  return {
    plugins: vitePlugins,
    server: {
      // port: 8080,
      host: '0.0.0.0',
      proxy: {
        '/interface': {
          target: 'https://h5.test-mk.net/interface/',
          devTarget: 'http://15.168.55.40:9000/interface/',
          targetTest: 'http://15.168.45.123:8091/',
          changeOrigin: false,
          secure: false,
          pathRewrite: {
            '^/interface': ''
          }
        },
        '/out': {
          testTarget: 'http://15.168.55.40/interface/',
          devTarget: 'http://devh5.558888666.com',
          target: 'http://devh5.558888666.com:8091/',
          changeOrigin: true,
          secure: true,
          pathRewrite: {
            '^/out': ''
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components')
      }
    },
    css: {
      // 配置`scss`和`less`全局变量
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/vars/_base.scss";'
        },
        less: {
          additionalData: '@import "@/styles/vars/_base.less";'
        }
      }
    }
  }
})
