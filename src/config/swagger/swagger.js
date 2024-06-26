/**
 * 使用swagger-typescript-api自动将swagger上的api接口转化为ts文件
 * 1、swagger.js
 *      生成、更新api：直接使用 `node swagger.js` 命令执行即可
 *      a、注意swagger-typescript-api包install时需要sudo赋予权限
 *      b、swaggerList对应需要输出的swagger地址
 *          1）name: 当前地址对应的name值，也对应输出的文件夹名称
 *          2）url: swagger.json的地址
 *          3) baseUrlPrefix: baseUrl前缀，输出的api中path参数会添加该值
 * 2、src/axios/http-client.ts
 *      HttpClient类包装后的axios对象文件，里面的axios对象直接使用的同级目录下的request.ts
 * 3、src/axios/swagger-typescript-api-template/modular
 *      生成器使用的模版路径，如何输出文件的内容均在里面修改
 * 4、src/swagger
 *      输出的文件路径
 * */
const { generateApi } = require('swagger-typescript-api')
const path = require('path')
const fs = require('fs')

const outputDir = './src/swagger'

/** 待写入的地址* */
const swaggerList = [
  {
    name: 'user',
    url: 'http://172.29.51.107:9001/v3/api-docs',
    baseUrlPrefix: ''
  }
]

swaggerList?.forEach((swaggerConfig, index) => {
  console.log(
    'swagger.js-----------------------------start-----------------------------'
  )
  /* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
  generateApi({
    url: swaggerConfig.url,
    output: path.resolve(process.cwd(), `${outputDir}/${swaggerConfig.name}`),
    modular: true,
    singleHttpClient: true,
    generateResponses: true,
    httpClientType: 'axios', // or "fetch"
    // !!!最重要: 套用的模版地址
    templates: path.resolve(
      __dirname,
      './src/axios/swagger-typescript-api-template/modular'
    ),
    routeTypes: true,
    hooks: {
      onInit: (configuration) => {
        // 修改引用的dataContracts文件名称
        configuration.configData = swaggerConfig
        configuration.fileNames.dataContracts = `contract-${swaggerConfig.name}`
      }
    }
  })
    .then(() => {
      // 删除多余的http-client.ts文件，统一用axios目录下的
      const pathHttpClient = `${outputDir}/${swaggerConfig.name}/http-client.ts`
      fs.existsSync(pathHttpClient) && fs.unlinkSync(pathHttpClient)
      // 删除多余的http-client.ts文件，统一用axios目录下的
      const pathHeartbeat = `${outputDir}/${swaggerConfig.name}/Heartbeat.ts`
      fs.existsSync(pathHeartbeat) && fs.unlinkSync(pathHeartbeat)
    })
    .finally(() => {
      if (index === swaggerList.length - 1) {
        console.log(
          'swagger.js-----------------------------end-----------------------------'
        )
      }
    })
})
