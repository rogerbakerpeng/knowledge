#### live-pusher

实时音视频录制，也称直播推流。

**平台差异说明**

| H5  | 微信小程序 | 支付宝小程序 |
| :-: | :--------: | :----------: |
|  x  |     √      |      x       |

**参数说明**

设置 live-pusher 组件的推流地址，推流视频模式等。

| 属性               | 类型        | 默认值     | 必填 | 说明                                                        | 平台差异说明           |
| :----------------- | :---------- | :--------- | :--- | :---------------------------------------------------------- | :--------------------- |
| url                | string      |            | 是   | 推流地址，支持 RTMP 协议。                                  |
| mode               | string      | SD         | 否   | 推流视频模式，可取值：SD（标清）, HD（高清）, FHD（超清）。 |
| aspect             | string      | 3:2        | 否   | 视频宽高比例                                                |
| muted              | Boolean     | false      | 否   | 是否静音。                                                  |
| enable-camera      | Boolean     | true       | 否   | 开启摄像头。                                                |
| auto-focus         | Boolean     | true       | 否   | 自动聚集。                                                  |
| beauty             | Number      | 0          | 否   | 美颜，取值范围 0-9（iOS 取值范围为 1） ，0 表示关闭。       |
| whiteness          | Number      | 0          | 否   | 美白，取值范围 0-9（iOS 取值范围为 1） ，0 表示关闭。       |
| orientation        | String      | "vertical" | 否   | 画面方向                                                    |
| min-bitrate        | Number      | 200        | 否   | 最小码率。                                                  |
| max-bitrate        | Number      | 1000       | 否   | 最大码率。                                                  |
| audio-quality      | string      | high       | 否   | 高音质(48KHz)或低音质(16KHz)，值为 high, low                | 微信小程序 1.7.0 支持  |
| waiting-image      | string      |            | 否   | 进入后台时推流的等待画面                                    | 微信小程序 1.7.0 支持  |
| waiting-image-hash | string      |            | 否   | 等待画面资源的 MD5 值                                       | 微信小程序 1.7.0 支持  |
| zoom               | boolean     | false      | 否   | 调整焦距                                                    | 微信小程序 2.1.0 支持  |
| device-position    | string      | front      | 否   | 前置或后置，值为 front, back                                | 微信小程序 2.3.0 支持  |
| background-mute    | boolean     | false      | 否   | 进入后台时是否静音                                          | 微信小程序 1.7.0 支持  |
| remote-mirror      | boolean     | false      | 否   | 设置推流画面是否镜像，产生的效果在 live-player 反应到       | 微信小程序 2.10.0 支持 |
| local-mirror       | string      | auto       | 否   | 控制本地预览画面是否镜像                                    | 微信小程序 2.10.0 支持 |
| audio-reverb-type  | number      | 0          | 否   | 音频混响类型                                                | 微信小程序 2.10.0 支持 |
| enable-mic         | boolean     | true       | 否   | 开启或关闭麦克风                                            | 微信小程序 2.10.0 支持 |
| enable-agc         | boolean     | false      | 否   | 是否开启音频自动增益                                        | 微信小程序 2.10.0 支持 |
| enable-ans         | boolean     | false      | 否   | 是否开启音频噪声抑制                                        | 微信小程序 2.10.0 支持 |
| audio-volume-type  | string      | voicecall  | 否   | 音量类型                                                    | 微信小程序 2.10.0 支持 |
| @statechange       | EventHandle |            |      | 状态变化事件，detail = {code}                               |
| @netstatus         | EventHandle |            |      | 网络状态通知，detail = {info}                               |
| @error             | EventHandle |            |      | 渲染错误事件，detail = {errMsg, errCode}                    |
| @bgmstart          | EventHandle |            |      | 背景音开始播放时触发                                        | 微信小程序 2.4.0 支持  |
| @bgmprogress       | EventHandle |            |      | 背景音进度变化时触发，detail = {progress, duration}         | 微信小程序 2.4.0 支持  |
| @bgmcomplete       | EventHandle |            |      | 背景音播放完成时触发                                        | 微信小程序 2.4.0 支持  |

#### orientation 的合法值

| 值         | 说明 |
| :--------- | :--- |
| vertical   | 竖直 |
| horizontal | 水平 |

#### local-mirror 的合法值

| 值      | 说明                             |
| :------ | :------------------------------- |
| auto    | 前置摄像头镜像，后置摄像头不镜像 |
| enable  | 前后置摄像头均镜像               |
| disable | 前后置摄像头均不镜像             |

#### audio-reverb-type 的合法值

| 值  | 说明   |
| :-- | :----- |
| 0   | 关闭   |
| 1   | KTV    |
| 2   | 小房间 |
| 3   | 大会堂 |
| 4   | 低沉   |
| 5   | 洪亮   |
| 6   | 金属声 |
| 7   | 磁性   |

#### audio-volume-type 的合法值

| 值        | 说明     |
| :-------- | :------- |
| media     | 媒体音量 |
| voicecall | 通话音量 |

#### 网络状态数据（info）安卓

| 键名         | 说明                                                  |
| :----------- | :---------------------------------------------------- |
| videoBitrate | 当前视频编/码器输出的比特率，单位 kbps                |
| audioBitrate | 当前音频编/码器输出的比特率，单位 kbps                |
| videoFPS     | 当前视频帧率                                          |
| videoGOP     | 当前视频 GOP,也就是每两个关键帧(I 帧)间隔时长，单位 s |
| netSpeed     | 当前的发送/接收速度                                   |
| netJitter    | 网络抖动情况，抖动越大，网络越不稳定                  |
| videoWidth   | 视频画面的宽度                                        |
| videoHeight  | 视频画面的高度                                        |

#### 网络状态数据（info）iOS

| 参数    | 类型   | 说明               |
| :------ | :----- | :----------------- |
| code    | Number | code 码            |
| message | string | 具体的网络状态信息 |

#### 事件

#### statechange

> 状态变化事件

##### 返回参数（detail）的详细说明

| 参数    | 类型   | 说明 |
| :------ | :----- | :--- |
| code    | Number |
| message | string |

#### netstatus

> 网络状态通知事件

##### 安卓 返回参数（detail）的详细说明

| 键名         | 说明                                                  |
| :----------- | :---------------------------------------------------- |
| videoBitrate | 当前视频编/码器输出的比特率，单位 kbps                |
| audioBitrate | 当前音频编/码器输出的比特率，单位 kbps                |
| videoFPS     | 当前视频帧率                                          |
| videoGOP     | 当前视频 GOP,也就是每两个关键帧(I 帧)间隔时长，单位 s |
| netSpeed     | 当前的发送/接收速度                                   |
| netJitter    | 网络抖动情况，抖动越大，网络越不稳定                  |
| videoWidth   | 视频画面的宽度                                        |
| videoHeight  | 视频画面的高度                                        |

##### iOS 返回参数（detail）的详细说明

| 参数    | 类型   | 说明               |
| :------ | :----- | :----------------- |
| code    | Number | code 码            |
| message | string | 具体的网络状态信息 |

#### error

> 渲染错误事件

##### 返回参数（detail）的详细说明

| 参数    | 类型   | 说明 |
| :------ | :----- | :--- |
| errCode | Number |
| errMsg  | string |

```html
<template>
    <view>
        <live-pusher
            id="livePusher"
            ref="livePusher"
            class="livePusher"
            url=""
            mode="SD"
            :muted="true"
            :enable-camera="true"
            :auto-focus="true"
            :beauty="1"
            whiteness="2"
            aspect="9:16"
            @statechange="statechange"
            @netstatus="netstatus"
            @error="error"
        ></live-pusher>
        <button class="btn" @click="start">开始推流</button>
        <button class="btn" @click="pause">暂停推流</button>
        <button class="btn" @click="resume">resume</button>
        <button class="btn" @click="stop">停止推流</button>
        <button class="btn" @click="snapshot">快照</button>
        <button class="btn" @click="startPreview">开启摄像头预览</button>
        <button class="btn" @click="stopPreview">关闭摄像头预览</button>
        <button class="btn" @click="switchCamera">切换摄像头</button>
    </view>
</template>
```

```javascript
<script>
    export default {
        data() {
			return {}
        },
        onReady() {
            // 注意：需要在onReady中 或 onLoad 延时
            this.context = uni.createLivePusherContext("livePusher", this);
        },
        methods: {
            statechange(e) {
                console.log("statechange:" + JSON.stringify(e));
            },
            netstatus(e) {
                console.log("netstatus:" + JSON.stringify(e));
            },
            error(e) {
                console.log("error:" + JSON.stringify(e));
            },
            start: function() {
                this.context.start({
                    success: (a) => {
                        console.log("livePusher.start:" + JSON.stringify(a));
                    }
                });
            },
            close: function() {
                this.context.close({
                    success: (a) => {
                        console.log("livePusher.close:" + JSON.stringify(a));
                    }
                });
            },
            snapshot: function() {
                this.context.snapshot({
                    success: (e) => {
                        console.log(JSON.stringify(e));
                    }
                });
            },
            resume: function() {
                this.context.resume({
                    success: (a) => {
                        console.log("livePusher.resume:" + JSON.stringify(a));
                    }
                });
            },
            pause: function() {
                this.context.pause({
                    success: (a) => {
                        console.log("livePusher.pause:" + JSON.stringify(a));
                    }
                });
            },
            stop: function() {
                this.context.stop({
                    success: (a) => {
                        console.log(JSON.stringify(a));
                    }
                });
            },
            switchCamera: function() {
                this.context.switchCamera({
                    success: (a) => {
                        console.log("livePusher.switchCamera:" + JSON.stringify(a));
                    }
                });
            },
            startPreview: function() {
                this.context.startPreview({
                    success: (a) => {
                        console.log("livePusher.startPreview:" + JSON.stringify(a));
                    }
                });
            },
            stopPreview: function() {
                this.context.stopPreview({
                    success: (a) => {
                        console.log("livePusher.stopPreview:" + JSON.stringify(a));
                    }
                });
            }
        }
    }
</script>
```

相关 api：`Util.createLivePusherContext`

**注意**

-   live-pusher 是平台小程序原生组件，在平台小程序端层级高于前端组件，需使用 cover-view 覆盖。在低版本微信中，live-pusher 无法内嵌于 scroll-view、movable-view 中。
