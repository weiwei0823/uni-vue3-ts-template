import type { UserConfig } from 'vite'
import { defineConfig, PluginOption } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import AutoRegistryComponents from 'unplugin-vue-components/vite'
// import VisualizerPlugin from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import viteCommonjs from 'vite-plugin-commonjs'
import ViteRequireContext from '@originjs/vite-plugin-require-context'

// https://vitejs.dev/config/
export default defineConfig((): UserConfig => {
  const isBuild = process.env.NODE_ENV === 'production'
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // 按需加载，自动引入
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dts: 'src/types/auto-imports.d.ts',
      vueTemplate: true
    }),
    // 自动按需引入组件(注意：需注册至 uni 之前，否则不会生效)
    AutoRegistryComponents({
      dts: 'src/types/components.d.ts',
      resolvers: [
        // 按需引入
      ]
    }),
    // https://github.com/antfu/unocss
    Unocss(),
    // vite支持require.context的plugin
    ViteRequireContext(),
    // vite支持commonjs的plugin
    viteCommonjs(),
    // gzip静态资源压缩
    viteCompression({
      deleteOriginFile: false, // 删除源文件
      threshold: 10240, // 压缩前最小文件大小
      algorithm: 'gzip', // 压缩算法
      ext: '.gz' // 文件类型
    }),
    // uniapp
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
      // 代理设置上，UniApp会识别vite.config文件，但是manifest的优先级要高于vite.config文件，所以配置一个即可
      proxy: {}
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
