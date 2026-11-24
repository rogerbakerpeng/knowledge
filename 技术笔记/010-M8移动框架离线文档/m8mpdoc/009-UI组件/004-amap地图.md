# 组件使用

## map 定位

### 介绍

-   定位组件，本组件仅提供定位及获取周边 POI 信息函数，不再封装地图展示组件。

-   请使用 uniapp 框架内置的[map 组件](https://uniapp.dcloud.io/component/map.html)进行地图展示。本文档介绍组件功能及 map 组件使用示例。

### 引入

手动引入时的引入路径：

```js
import EmMap from '@components/em-map/index.js';
```

emMap 作为全局函数，跨端框架为其提供了全局注入的功能，使用该函数时，框架会自动引入上述路径，所以在跨端框架中使用时，不必再手动引入。

### 代码演示

#### 基础用法

**注意**

1. uniapp 的 map 组件，在不同平台的底层引擎是不同的：在小程序中，使用的都是小程序的原生地图组件，而在 H5 中，默认使用的是腾讯或谷歌三方地图，所以在 H5 端，需要在`manifest.json`中配置腾讯或谷歌等三方地图服务商申请的秘钥（key）：

```json
{
    "name": "",
    "appid": "",
    "h5": {
        "sdkConfigs": {
            "maps": {
                "qqmap": {
                    "key": "76FBZ-4C76F-733J7-NFVFX-5O6A6-VRFSW"
                },
                "google": {
                    "key": ""
                }
            }
        }
    }
}
```

2. 在微信小程序中，使用地图定位，首先需要在 “小程序管理后台 -「开发」-「开发管理」-「接口设置」” 中完成权限申请，然后在`manifest.json`中配置接口权限及规则：

```json
{
    "name": "",
    "appid": "",
    "mp-weixin": {
        "permission": {
            // 配置接口权限
            "scope.userLocation": {
                "desc": "你的位置信息将用于小程序位置接口的效果展示"
            }
        },
        // 声明规则
        "requiredPrivateInfos": ["getLocation"]
    }
}
```

具体请查看[微信小程序官方公告](https://developers.weixin.qq.com/community/develop/doc/000a02f2c5026891650e7f40351c01)

使用 map 组件代码示例：

```html
<map
    id="map"
    style="width: 100vw;height: 300px;"
    :longitude="longitude"
    :latitude="latitude"
    show-location
    :circles="circles"
    :controls="controls"
    @controltap="updateLocation"
></map>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            // 周边POI信息数组
            pois: [],
            // 正在定位标识
            loading: true,
            // 当前位置经纬度
            longitude: 0,
            latitude: 0,
            // 在地图上的圆数组
            circles: []
        };
    },
    computed: {
        // 地图控件使用的图片
        iconPath() {
            return `/static/images/map-icon-${this.loading ? 'waite' : 'locate'}.png`;
        },
        // 自定义控件数组，本示例自定义的控件为定位控件
        controls() {
            return [
                {
                    id: 1,
                    position: {
                        width: 32,
                        height: 32,
                        left: 10,
                        top: 300 - 42
                    },
                    iconPath: this.iconPath,
                    clickable: true
                }
            ];
        }
    },
    methods: {
        // 刷新定位
        update() {
            this.loading = true;

            EmMap({
                // 获取POI信息需要传腾讯地图的key
                qqMapKey: '76FBZ-4C76F-733J7-NFVFX-5O6A6-VRFSW',
                // 获取周边信息
                poicallback: (res) => {
                    this.pois = res.pois.slice(0);
                },
                error: (err) => {
                    this.loading = false;
                    console.error('定位失败：', err);
                },
                success: (position) => {
                    this.loading = false;
                    this.longitude = position[0];
                    this.latitude = position[1];

                    this.circles = [
                        {
                            longitude: this.longitude,
                            latitude: this.latitude,
                            radius: 100,
                            strokeWidth: 2,
                            color: '#2e6be5' + '9A',
                            fillColor: '#d8e4ff' + '6A'
                        }
                    ];
                }
            });
        }
    },
    mounted() {
        this.update();
    }
};
```

::: endif
::: ifdef M84

```js
import { ref, computed, onMounted } from 'vue';

// 周边POI信息数组
const pois = ref([]);
// 正在定位标识
const loading = ref(true);
// 当前位置经纬度
const longitude = ref(0);
const latitude = ref(0);
// 在地图上的圆数组
const circles = ref([]);

// 地图控件使用的图片
const iconPath = computed(() => {
    return `/static/images/map-icon-${loading.value ? 'waite' : 'locate'}.png`;
});

// 自定义控件数组，本示例自定义的控件为定位控件
const controls = computed(() => {
    return [
        {
            id: 1,
            position: {
                width: 32,
                height: 32,
                left: 10,
                top: 300 - 42
            },
            iconPath: iconPath.value,
            clickable: true
        }
    ];
});

// 刷新定位
const update = () => {
    loading.value = true;

    EmMap({
        // 获取POI信息需要传腾讯地图的key
        qqMapKey: '76FBZ-4C76F-733J7-NFVFX-5O6A6-VRFSW',
        // 获取周边信息
        poicallback: (res) => {
            pois.value = res.pois.slice(0);
        },
        error: (err) => {
            loading.value = false;
            console.error('定位失败：', err);
        },
        success: (position) => {
            loading.value = false;
            longitude.value = position[0];
            latitude.value = position[1];

            circles.value = [
                {
                    longitude: longitude.value,
                    latitude: latitude.value,
                    radius: 100,
                    strokeWidth: 2,
                    color: '#2e6be5' + '9A',
                    fillColor: '#d8e4ff' + '6A'
                }
            ];
        }
    });
};

onMounted(() => {
    update();
});
```

::: endif

### API

#### Options

| 参数        |                                   说明                                    | 类型     | 默认值  |
| :---------- | :-----------------------------------------------------------------------: | :------- | :------ |
| qqMapKey    |  组件函数获取周边信息时，使用的是腾讯地图的 API，所以需要腾讯地图的 key   | string   | -       |
| isForceDD   | 是否强制使用`dd.device.geolocation.get`方法获取当前定位（钉钉环境中有效） | boolean  | `false` |
| isForceEJS  |        是否强制使用 ejs 原生地图方法获取当前定位（ejs 环境中有效）        | boolean  | `false` |
| poicallback |               获取周边信息的回调函数，回调参数为 `res: obj`               | function | -       |
| success     |    定位成功后的回调函数，回调参数为 `position: [longitude, latitude]`     | function | -       |
| error       |                定位失败后的回调函数，回调参数为 `err: obj`                | function | -       |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-map"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-map"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif

 <style>
 .ui-showcase-iframe {
    position: fixed;
    right: 3.5vw;
    top: 17%;
    width: 375px;
    height: 75vh;
    box-shadow: 0 0 12px 6px #eee;
    border-radius: 15px;
 }
 .main .markdown-body {
    padding: 45px;
    width: calc(97vw - 661px);
}
 </style>
