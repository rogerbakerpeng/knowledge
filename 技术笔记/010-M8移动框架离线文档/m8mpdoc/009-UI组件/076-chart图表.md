# 组件使用

## Chart 图表

### 介绍

-   参考[`echarts-for-weixin`](https://github.com/ecomfe/echarts-for-weixin)，基于[`Echarts`图表库](https://echarts.apache.org/handbook/zh/concepts/chart-size)封装的跨端组件。该组件自`v8.3.9`版本开始支持。

### 代码演示

```html
<div class="content">
    <em-chart ref="emChart" width="100vw" height="400px" @loaded="loaded"></em-chart>
    <em-button type="primary" @click="getImage">获取图片</em-button>
    <em-button type="info" @click="refresh">刷新图表</em-button>
    <em-button type="info" @click="addEvent">绑定图表点击事件</em-button>
    <em-image v-if="imageUrl" width="100vw" height="400px" :src="imageUrl" />
</div>
```

::: ifdef M83

```js
import * as echarts from '@components/../sub_components/em-chart/ec-chart/echarts.js';
export default {
    data() {
        return {
            imageUrl: ''
        };
    },
    methods: {
        async loaded() {
            this.myChartNode = this.$refs.emChart;
            this.myChartNode.initChart(this.getOption());
            // 获取echarts图表的实例，可使用echarts实例上的方法
            // 由于图表初始化完成后才可以获取echarts实例，所以该方法是异步的
            this.myChart = await this.$refs.emChart.getInstance();
        },
        getImage() {
            const self = this;

            // 小程序平台都是由canvas渲染，生成图片时会将tooltip一起截图
            // 为了与H5端保持一致，建议在获取图片时隐藏多余的组件
            this.myChart.dispatchAction({
                type: 'hideTip'
            });

            setTimeout(() => {
                this.myChartNode.getImage({
                    success(res) {
                        // 在H5平台下，tempFilePath 为 base64
                        // 支付宝小程序的IDE不支持 canvasToTempFilePath，请在真机上进行预览
                        self.imageUrl = res.tempFilePath;
                    },
                    fail(error) {
                        console.log(error);
                    }
                });
            }, 300);
        },
        refresh() {
            let option = this.getOption();

            option.title.text = '蒸发量和降水量比较';
            this.myChartNode.setOption(option);
        },
        addEvent() {
            this.myChart.on('click', 'series', function () {
                // 默认使用同层渲染
                // 微信小程序的IDE上预览图表时，若遮挡了其他元素，请在真机上预览，以真机预览效果为准
                ejs.ui.toast('series 被点击了');
            });
        },
        getOption() {
            return {
                title: {
                    text: '某地区蒸发量和降水量',
                    subtext: '纯属虚构'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['蒸发量', '降水量'],
                    y: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '蒸发量',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                        markLine: {
                            data: [{ type: 'average', name: '平均值' }]
                        },
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: '#005BEA'
                                },
                                {
                                    offset: 1,
                                    color: '#00C6FB'
                                }
                            ])
                        }
                    },
                    {
                        name: '降水量',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                        markPoint: {
                            data: [
                                { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                                { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
                            ]
                        },
                        markLine: {
                            data: [{ type: 'average', name: '平均值' }]
                        }
                    }
                ]
            };
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
import * as echarts from '@components/../sub_components/em-chart/ec-chart/echarts.js';

const emChart = ref(null);
const imageUrl = ref('');
const myChartNode = ref(null);
const myChart = ref(null);

const loaded = async () => {
    myChartNode.value = emChart.value;
    myChartNode.value.initChart(getOption());
    // 获取echarts图表的实例，可使用echarts实例上的方法
    myChart.value = await myChartNode.value.getInstance();
};

const getImage = () => {
    // 小程序平台都是由canvas渲染，生成图片时会将tooltip一起截图
    myChart.value.dispatchAction({
        type: 'hideTip'
    });

    setTimeout(() => {
        myChartNode.value.getImage({
            success(res) {
                // 在H5平台下，tempFilePath 为 base64
                // 支付宝小程序的IDE不支持 canvasToTempFilePath，请在真机上进行预览
                imageUrl.value = res.tempFilePath;
            },
            fail(error) {
                console.log(error);
            }
        });
    }, 300);
};

const refresh = () => {
    let option = getOption();
    option.title.text = '蒸发量和降水量比较';
    myChartNode.value.setOption(option);
};

const addEvent = () => {
    myChart.value.on('click', 'series', function () {
        // 默认使用同层渲染
        ejs.ui.toast('series 被点击了');
    });
};

const getOption = () => {
    return {
        title: {
            text: '某地区蒸发量和降水量',
            subtext: '纯属虚构'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['蒸发量', '降水量'],
            y: 'bottom'
        },
        toolbox: {
            show: true,
            feature: {
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '蒸发量',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: '平均值' }]
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#005BEA'
                        },
                        {
                            offset: 1,
                            color: '#00C6FB'
                        }
                    ])
                }
            },
            {
                name: '降水量',
                type: 'bar',
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint: {
                    data: [
                        { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                        { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: '平均值' }]
                }
            }
        ]
    };
};
```

::: endif

### API

#### Props

| 参数          |                                                         说明                                                          | 类型          | 默认值  |
| :------------ | :-------------------------------------------------------------------------------------------------------------------: | :------------ | :------ |
| disable-touch |                                                    禁用`touch`事件                                                    | boolean       | `false` |
| width         |                                                组件宽度，默认单位`px`                                                 | string/number | `300px` |
| height        |                                                组件高度，默认单位`px`                                                 | string/number | `200px` |
| lazyLoad      |                                                  是否手动初始化图表                                                   | boolean       | `true`  |
| option        | 自动初始化图表时，传入的图表配置项，见官方文档 [`ECharts`配置项手册](https://echarts.apache.org/zh/option.html#title) | object        | `-`     |

#### 方法

| 方法名                                                                                     |                                                    说明                                                    | 参数                                                               | 返回值    |
| :----------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------- | :-------- |
| initChart                                                                                  |                                                 初始化图表                                                 | option：图表配置项                                                 | -         |
| setOption                                                                                  |                                                  刷新图表                                                  | option：图表配置项                                                 | -         |
| getImage                                                                                   | 生成图片，H5 端通过`ECharts`实例方法`getDataURL`获取，平台小程序端通过各平台`canvasToTempFilePath`方法获取 | option：各平台对应方法的参数配置，获取结果通过`option.success`回调 | -         |
| getInstance                                                                                |                 获取`ECharts`实例，由于初始化完成后才能获取到实例，所以该方法是个异步方法                  | -                                                                  | `Promise` |
| getEcharts ::: ifdef M83 `8.3.23-beta.3` ::: endif ::: ifdef M84 `8.4.0-beta.12` ::: endif |      获取`echarts`变量，可在异步分包时通过该方法获取 `echarts`，避免框架重复在分包中打包 `echarts`库       | -                                                                  | `echarts` |

#### Events

| 事件名           |                             说明                              | 回调参数 |
| :--------------- | :-----------------------------------------------------------: | :------- |
| loaded `v8.3.12` | 图表组件`mounted`生命周期触发，用于异步化分包时进行初始化操作 | -        |

### 注意事项

#### 未支持的功能

`Echarts`是 H5 端流行的图表库，但是在跨平台兼容方面有些问题，据`echarts-for-weixin`官方文档介绍，有些功能在小程序端还未支持：

1. 图片

2. 多个 `zlevel` 分层

3. `toolbox` 中的 `dataView`、`saveAsImage`

#### 兼容性问题

在跨端框架中使用 `ECharts` 时，也会有一些兼容性问题，框架会根据项目反馈持续总结在该文档中供参考。

1. H5 环境下`tooltip`无法正常触发

原因：`ECharts`判断运行环境时，会通过是否存在全局变量`wx`来判断当前是否是微信环境，而`uniapp`在 H5 端为了兼容如微信公众号、企业微信等环境，会默认覆盖设置全局变量`wx`，导致 `ECharts` 对运行环境误判，出现该问题。

解决方式：H5 端在页面引入`ECharts`之前，将该全局变量`wx`置空。`em-chart`组件在 H5 端已默认添加置空语句。

```js
// #ifdef H5
window.wx = undefined;
// #endif
```

#### 其他图表库

`ECharts`虽然图表类型丰富、功能强大，但其跨平台方面有些不足，在小程序端也会有些性能问题。

在跨端框架中展示图表，若需要的图表类型不用太丰富，非常推荐使用`uChart`库：[`uChart`文档](https://www.ucharts.cn/v2/#/)

-   优点：唯一一款跨全端的图表库，`uniapp`官方推荐使用，与跨端框架适配。

-   缺点：图表类型相比 `ECharts` 少，自定义样式功能相比 `ECharts` 少

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-chart"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-chart"
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
