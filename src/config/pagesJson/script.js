const fs = require('fs');
const path = require('path');
const configFile = {
    filePath: '../../pages.json',
    platform: process.argv[2],
    pages: {},
    configFilePath: path.join(path.resolve(__dirname, '..'), 'config.js')
};
// 读取 pages.json 文件或创建新文件
try {
    configFile.pages = JSON.parse(fs.readFileSync(configFile.filePath, 'utf8'));
} catch (error) {
    console.warn(`pages.json 文件未找到，创建新文件: ${configFile.filePath}`);
    configFile.pages = {
        "easycom": {
            "^u-(.*)": "@/uview-ui/components/u-$1/u-$1.vue"
        },
        "pages": [],
        "globalStyle": {
            "rpxCalcMaxDeviceWidth": 480,
            "rpxCalcBaseDeviceWidth": 480,
            "rpxCalcIncludeWidth": 750,
            "maxWidth": 480,
            "navigationBarTextStyle": "black",
            "navigationBarTitleText": "uni-app",
            "navigationBarBackgroundColor": "#FFFFFF",
            "backgroundColor": "#404040",
            "navigationStyle": "custom",
            "app-plus": {
                "titleView": false,
                "bounce": "none"
            }
        },
        "tabBar": {
            "list": []
        },
        "app-plus": {
            "safearea": {
                "background": "#RRGGBB",
                "backgroundDark": "#RRGGBB",
                "bottom": {
                    "offset": "none"
                },
                "left": {
                    "offset": "none"
                },
                "right": {
                    "offset": "none"
                },
                "top": {
                    "offset": "none"
                }
            }
        },
        "condition": {
            "current": 0,
            "list": [
                {
                    "name": "",
                    "path": "",
                    "query": ""
                }
            ]
        }
    };
}
// 读取 pages-*.json 文件
const pagesGetObj = JSON.parse(fs.readFileSync(`pages-${configFile.platform}.json`, 'utf8'));
// 更新页面内容
configFile.pages.pages = pagesGetObj.pages;
configFile.pages.tabBar.list = pagesGetObj.tabBarList;
// 将更新后的数据写入 pages.json 文件
fs.writeFileSync(configFile.filePath, JSON.stringify(configFile.pages, null, 4), 'utf8');
/**
 * 开始修改 config.js 中的站点
 */
fs.readFile(configFile.configFilePath, 'utf8', (err, data) => {
    const text = `configEnums.STATION.${configFile.platform.toUpperCase()}`;
    if (err) {
        console.error(`读取 config.js 文件出错，请手动将站点修改为: ${text}`, err);
        return;
    }
    // 替换 station 的值
    const updatedData = data.replace(/var station\s*=\s*[^;\n]*/g, `var station = ${text}`);
    // 将更新后的数据写入 config.js 文件
    fs.writeFile(configFile.configFilePath, updatedData, 'utf8', err => {
        if (err) {
            console.error('写入 config.js 文件出错:', err);
            return;
        }
    });
});