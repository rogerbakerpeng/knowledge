# Ajax 与文件上传

## 使用场景

核心工具集中内置了 `Ajax` 与 `Upload`，适用于

-   前端页面需要用到接口请求时

-   需要用到文件上传时

## 方法说明

注：框架对 `axios` 进行封装并挂载到核心工具中，通过 `Util.method()` 调用，如 `Util.ajax()` ，`Ajax` 或 `Upload` 返回的是 `Promise` 对象，支持链式调用

### ajax(options)

进行 ajax 请求，有两种使用方法

-   普通版本，传入 `success` 和 `error` 处理回调，并且 `error` 如果不穿，有一个默认的实现效果

-   `Promise` 版本，`Ajax` 返回的 `Promise` 对象可以链式调用，注意如果要去除默认的失败回调实现，请将 `error` 传 `null`

| H5  | 新点小程序 | 微信小程序 | 支付宝小程序 |
| :-: | :--------: | :--------: | :----------: |
|  √  |     √      |     √      |      √       |

**普通版本**

```js
Util.ajax({
    url: Config.serverUrl + 'request.php?action=testV7Detail',
    data: {
        params: JSON.stringify({
            guid: '12345'
        })
    },
    // v8.3.10优化支持dataPath，建议使用
    dataPath: 'custom',
    success: (result) => {
        // dataPath配置后，匹配成功result.code为1，返回的result.data直接就是 路径匹配 节点下的数据
        if (result.code === 1) {
            // xxx
        }
    },
    error: (err) => {
        // error callback
    },
    complete: () => {
        // complete callback
    }
});
```

**Promise 版本**

```js
Util.ajax({
    url: Config.serverUrl + 'request.php?action=testV7Detail',
    data: {
        params: JSON.stringify({
            guid: '12345'
        })
    }
})
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        // error callback
    })
    .finally(() => {
        // complete callback
    });
```

也可以控制多个 `Ajax` 请求

```js
const ajax1 = Util.ajax({
    url: 'https://www.easy-mock.com/mock/5cb6ca44f6c8be4af31ae04d/mock/getTreeOuModel',
    data: {
        token: '123'
    }
});

const ajax2 = Util.ajax({
    url: 'https://www.easy-mock.com/mock/5cb6ca44f6c8be4af31ae04d/mock/getSingleTreeModule',
    data: {
        token: '321'
    }
});

Util.ajaxAll(ajax1, ajax2).then((response) => {
    // ajax1 返回的数据
    const res1 = response[0];
    // ajax2 返回的数据
    const res2 = response[1];
});
```

**参数说明**

所有的参数都在 `options` 对象下 (AjaxOptions)

| 参数              | 参数类型       | 说明                                                                                                                                                     | 平台差异说明        |
| ----------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| url               | String         | `必填`, 请求的 url                                                                                                                                       |                     |
| data              | String 或 JSON | `必填`，请求的数据                                                                                                                                       |                     |
| type              | String         | 请求类别，`GET` 或 `POST`，默认为 `POST`，                                                                                                               | 有效值详见下方说明  |
| isAutoProxy       | Boolean        | 默认为 `true`，如设置为 `false`，则单个请求不会在请求头中携带用户 token                                                                                  |                     |
| isAutoFingerprint | Boolean        | 默认为 `true`，如设置为 `false`，则单个请求不会在请求头中携带指纹，`isAutoProxy` 为 `true` 时生效                                                        |                     |
| isAutoErrToast    | Boolean        | 默认为 `false`，是否开启错误状态码自动弹窗提示                                                                                                           |                     |
| isUseEjsFetchAjax | Boolean        | 默认为 `false`，是否使用原生请求代理 ajax 请求                                                                                                           |                     |
| isAutoDealError   | Boolean        | 默认为 `true`，如开启，框架会处理一些默认的返回错误并提示（非 200 情况下），处理的错误码有：401，403，417，429                                           |                     |
| success           | Function       | 成功回调，如不写，则有个默认实现，或者通过 `.then` 进行链式调用                                                                                          |                     |
| error             | Function       | 失败回调，默认有一个失败回调的实现，会打印错误信息                                                                                                       |                     |
| complete          | Function       | 请求完成后的回调，不管是成功还是失败都会触发                                                                                                             |                     |
| responseType      | String         | 服务器响应的数据类型                                                                                                                                     |                     |
| timeout           | Number         | 请求超时的毫秒数                                                                                                                                         |                     |
| headers           | Object         | 设置请求的 header，header 中不能设置 Referer                                                                                                             |                     |
| withCredentials   | Boolean        | 跨域请求时是否需要使用凭证                                                                                                                               | 仅 H5 支持          |
| contentType       | String         | 发送信息至服务器时内容编码类型，普通请求默认为 `application/x-www-form-urlencoded`，文件上传请求默认为 `multipart/form-data`                                              |                     |
| statusErrorExtend | Function       | `v8.2.16`新增，http 状态扩展方法，产品项目可以根据业务自行判断 status 状态处理错误处理                                                                   |                     |
| dataPath          | String/Array   | `v8.3.10`新增，需要获取的路径指令，例如 custum.infolist 或['custum.infolist', 'custum.infoList']，如果为 undefined 或 null，则不会处理，返回的是原始数据 |                     |
| enableChunked     | Boolean        | `v8.3.17`新增，是否开启 SSE 流式响应，默认 false                                                                                                         | H5、微信小程序 支持 |
| onChunkReceived   | Function       | `v8.3.17`新增，SSE 流式响应接收到数据时触发的回调函数，参数为接收到的数据                                                                                | H5、微信小程序 支持 |
| lockTokenDuration | Number         | `v8.3.22`新增，锁定 token 的时长，单位 ms                                                                                                                |                     |
| cancelKey         | String         | 中断请求的自定义 key 值，可通过该 key 值获取 ajax 的取消方法取消请求                                                                                     |                     |

**type 有效值**

注意：type 有效值必须大写，每个平台支持的 method 有效值不同，详细见下表。

|  type   | EJS | H5  | 微信小程序 | 支付宝小程序 |
| :-----: | :-: | :-: | :--------: | :----------: |
|   GET   |  √  |  √  |     √      |      √       |
|  POST   |  √  |  √  |     √      |      √       |
|   PUT   |  x  |  √  |     √      |      √       |
| DELETE  |  x  |  √  |     √      |      √       |
| CONNECT |  x  |  √  |     √      |      x       |
|  HEAD   |  x  |  √  |     √      |      x       |
| OPTIONS |  x  |  √  |     √      |      x       |
|  TRACE  |  x  |  √  |     √      |      x       |

**referer 说明**

网络请求的 referer Header 不可设置。

`ejs`与`h5` referer 默认传当前页面的 URL。

平台小程序格式固定

###### 支付宝：

为 https://{appid}.hybrid.alipay-eco.com/{appid}/{version}/index.html#pages/index，其中 {appid} 为小程序的 APPID，{version} 为小程序发布标识。

###### 微信：

为 https://servicewechat.com/{appid}/{version}/page-frame.html，其中 {appid} 为小程序的 appid，{version} 为小程序的版本号，版本号为 0 表示为开发版

**成功返回**

-   返回一个 `response`，即返回的是原始数据`response`

-   配置`dataPath`:

`v8.3.10`开始，支持配置`dataPath`，可以获取指定路径的数据。配置后的成功返回：

|  参数   |   参数类型    |                                                 说明                                                 |
| :-----: | :-----------: | :--------------------------------------------------------------------------------------------------: |
|  code   |    Number     | 处理完的结果，为`1`代表处理成功，`0`代表失败，一般失败的原因是接口返回的 status 不正确或者格式不匹配 |
|  data   |    Object     |                     处理完后的最终数据，如果没有获取到对应节点下的数据，为 null                      |
| message |    String     |                   处理完后的提示，例如错误信息提示、接口返回的 status.text 信息等                    |
| status  | Number/String |                                      接口返回的 status.code 值                                       |

**失败返回**

| 参数  | 参数类型 | 说明     |
| ----- | -------- | -------- |
| error | String   | 错误信息 |

**Tips**

-   请求的 `header` 中 `content-type` 默认为 `application/json`。
-   避免在 `header` 中使用中文，或者使用 encodeURIComponent 进行编码。
-   网络请求的 `超时时间` 可以统一在 `manifest.json` 中配置。
-   注意平台小程序端不支持自动保持 cookie，服务器应避免验证 cookie。

### 取消 Ajax

可传递一个 `cancelKey` 给 `ajax`，在需要取消请求时，通过 `cancelKey` 获取到对应的取消方法，然后调用取消方法即可中断请求。

```js
Util.ajax({
    url: Config.serverUrl + 'request.php?action=testV7Detail',
    data: {
        params: JSON.stringify({
            guid: '12345'
        })
    },
    // 传递一个key值
    cancelKey: 'key1',
    success: (result) => {},
    error: (err) => {}
});

// ajax实例上绑定了cancels映射，通过该key值获取对应取消方法中断请求
Util.ajax.cancels['key1']();
```

### Util.ajax 支持暴露 axios 实例

`v8.3.10` 版本开始，Util.ajax 支持暴露 axios 实例，方便产品项目对 axios 进行拦截、封装等操作。
产品项目如果想要实现通用的 Util.ajax 某些功能，可以借助于此功能实现。例如政务 BG 进行 ajax 统一 sm2 加密解密场景；产品项目对请求拦截、响应拦截有其他通用需求场景等。

使用方式：

`Util.ajax.instance`为 Util.ajax 的 axios 实例，可以在此进行请求拦截、响应拦截等功能开发。

```js
const instance = Util.ajax.instance;

instance.interceptors.request.use((config) => {
    // xxx

    return config;
});
instance.interceptors.response.use((response) => {
    // xxx

    return response;
});
```

::: ifdef M84

### 拦截器管理

`8.4.0-beta.3`版本开始，Util.ajax 新增了一些方法来更好的管理拦截器，方便产品项目基于框架方法进行拓展。

#### create 方法

创建一个新的 ajax 实例：UtilAjaxInstance，框架的 Util.ajax 就是通过该方法生成的。

```ts
interface UtilAjaxInstance {
    (options: AjaxOptions): Promise<any>;
    instance: AxiosInstance; // axios 实例
    cancels?: cancels; // 请求取消方法数组
    minirefreshPending?: Array<{ f: cancelFunc }>; // 下拉刷新请求取消方法数组
    pluginFactory: InterceptorsPluginFactory; // 拦截器插件工厂方法
    plugins: {
        request: InterceptorsPlugin[]; // 请求拦截器插件数组
        response: InterceptorsPlugin[]; // 响应拦截器插件数组
    };
    _defaultSettings: AjaxOptions; // 默认配置
    create: (option?: AjaxOptions) => UtilAjaxInstance; // 创建一个新的 Util.ajax 实例
    addInterceptors: (plugin?: InterceptorsPlugin | InterceptorsPlugin[]) => void; // 添加拦截器插件
    removeInterceptors: (pluginName?: string | string[], type?: 'request' | 'response') => void; // 删除拦截器插件
    request: (options: AjaxOptions) => Promise<any>; // 发送请求
    createInterceptorsPlugin: (option: InterceptorsPluginOpt) => InterceptorsPlugin; // 创建拦截器插件
}
```

使用示例：

```ts
// 创建时可传入默认配置
// newAjax 功能与 Util.ajax 一致
const newAjax: UtilAjaxInstance = Util.ajax.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

newAjax({
    url: 'https://www.easy-mock.com/mock/5cb6ca44f6c8be4af31ae04d/mock/getTreeOuModel',
    data: {
        token: '123'
    }
}).then((response) => {
    console.log(response);
});
```

#### createInterceptorsPlugin 方法

创建一个拦截器插件：InterceptorsPlugin

```ts
interface InterceptorsPlugin {
    _interceptorsID: number; // 拦截器 ID
    _opt: InterceptorsPluginOpt; // 拦截器配置，见下
    name: string; // 拦截器名称
    type: 'request' | 'response'; // 拦截器类型
    description?: string; // 描述信息
    install: (axiosInstance: AxiosInstance) => void; // 安装拦截器插件
    uninstall: (axiosInstance: AxiosInstance) => void; // 卸载拦截器插件
}

interface InterceptorsPluginOpt {
    name: string; // 拦截器名称
    type: 'request' | 'response'; // 拦截器类型
    description?: string; // 描述信息
    success: {
        <T extends AxiosRequestConfig>(config: T): T | Promise<T>;
        <T extends AxiosResponse>(config: T): T | Promise<T>;
        <T extends AxiosRequestConfig | AxiosResponse>(config: T): T | Promise<T>;
    }; // 拦截器成功回调
    error?: (error: any) => Promise<any>; // 拦截器失败回调
    onUninstall?: (axiosInstance: AxiosInstance) => void; // 拦截器卸载时触发该回调，可在此处清除一些不需要的实例对象
}
```

用法示例；

```ts
// 创建一个请求拦截器插件
const testRequestPlugin = Util.ajax.createInterceptorsPlugin({
    name: 'test',
    type: 'request',
    description: '测试请求拦截器',
    success: (config) => {
        // 这里可以对请求参数进行处理
        return config;
    }
});
// 创建一个响应拦截器插件
const testResponsePlugin = Util.ajax.createInterceptorsPlugin({
    name: 'test',
    type: 'response',
    description: '测试响应拦截器',
    success: (response) => {
        // 这里可以对返回参数进行处理
        return response;
    }
});

// 添加拦截器插件
Util.ajax.addInterceptors([testRequestPlugin, testResponsePlugin]);

// 不需要时移除拦截器插件
// 传入拦截器插件名称，会移除所有该名称下的拦截器插件
Util.ajax.removeInterceptors('test'); // 移除 testRequestPlugin 和 testResponsePlugin

// 传入拦截器插件名称和类型，会移除该类型下的该名称的拦截器插件
Util.ajax.removeInterceptors('test', 'request'); // 移除 testRequestPlugin
```

框架内置了一批拦截器插件，框架的自动代理、中断请求等功能都通过拦截器来实现，已安装的插件可通过 Util.ajax.plugins 查看，如果产品项目不需要某个功能，可以直接移除该拦截器插件。

```ts
const newAjax: UtilAjaxInstance = Util.ajax.create();

// 移除框架的自动代理功能
newAjax.removeInterceptors('proxy');
```

**注意：**

框架功能都通过拦截器实现后，原先通过`Util.ajax.instance`添加的请求拦截器都会比框架的处理更先执行，而通过拦截器插件添加的请求拦截器则会在框架的处理之后执行。请注意下执行顺序。

::: endif

### upload(options)

将本地资源上传到开发者服务器，客户端发起一个 `POST` 请求，其中 `content-type` 为 `multipart/form-data`。

| H5  | 新点小程序 | 微信小程序 | 支付宝小程序 |
| :-: | :--------: | :--------: | :----------: |
|  √  |     √      |     √      |      √       |

    在各个平台小程序运行时，网络相关的 API 在使用前需要配置域名白名单。

**方式一：filePath 上传（推荐，支持跨端）**

通过 `filePath`（文件路径）和 `name`（表单字段名）配套使用，支持 H5、微信小程序、支付宝小程序跨端上传。

```html
<template>
    <div class="content">
        <em-uploader :after-read="afterRead" />
    </div>
</template>

<script>
export default {
    methods: {
        afterRead(file) {
            Util.upload({
                url: Config.serverUrl + 'uploadattach',
                filePath: file.path,
                name: 'file', // 表单字段名（key），服务器端通过此 key 获取文件，不是文件名
                formData: {
                    user: 'test'
                },
                success: (res) => {
                    console.log(res);
                }
            });
        }
    }
}
</script>
```

**方式二：files 上传（仅 H5 支持）**

通过 `files` 数组传入文件对象，适用于需要传递原始 File 对象的场景。

```html
<template>
    <div class="content">
        <em-uploader :after-read="afterRead" />
    </div>
</template>

<script>
export default {
    methods: {
        afterRead(file) {
            Util.upload({
                url: Config.serverUrl + 'uploadattach',
                files: [{
                    file: file.file,  // 注意：必须传 file.file（原始 File 对象），不是 file 本身
                    name: 'file'      // 表单字段名（key），默认为 'file'
                }],
                formData: {
                    user: 'test'
                },
                success: (res) => {
                    console.log(res);
                }
            });
        }
    }
}
</script>
```

**方式三：结合业务数据上传**

在实际项目中，通常需要在上传附件的同时传递业务参数：

```html
<script>
export default {
    methods: {
        async afterRead(file) {
            file.status = 'uploading';
            file.message = '上传中...';

            Util.upload({
                url: Config.serverUrl + 'mobile/xxx/uploadattach',
                filePath: file.path,
                name: 'file',
                data: {
                    params: JSON.stringify({
                        rowguid: this.rowguid,
                        userguid: sessionStorage.getItem('userguid'),
                        filename: file.file.name  // 原始文件名通过 file.file.name 获取
                    })
                },
                success: (res) => {
                    file.status = 'done';
                    file.message = '上传成功';
                },
                error: () => {
                    file.status = 'failed';
                    file.message = '上传失败';
                }
            });
        }
    }
}
</script>
```

> **⚠️ em-uploader afterRead 回调参数说明**
>
> `em-uploader` 组件的 `afterRead` 回调参数 `file` **不是原始的 File 对象**，而是组件封装的对象，其结构如下：
>
> | 属性    | 类型   | 说明                                    |
> | ------- | ------ | --------------------------------------- |
> | path    | String | 文件的临时路径（H5 下为 Blob URL）       |
> | name    | String | 文件名（如 `photo.jpg`）                |
> | size    | Number | 文件大小（字节）                        |
> | type    | String | 文件 MIME 类型                          |
> | file    | File   | **原始 File 对象**（仅 H5 可用）         |
> | status  | String | 上传状态，可手动设置 `uploading`/`done`/`failed` |
> | message | String | 上传提示文本                            |
>
> **常见误区：**
>
> - ❌ `files: [{ file: file }]` — 错误！`afterRead` 回调的 `file` 是封装对象，直接传入会导致上传异常
> - ✅ `files: [{ file: file.file }]` — 正确，需要通过 `file.file` 取出原始 File 对象
> - ❌ `files: [{ file: file, name: file.name }]` — 错误！`file` 不是 File 对象，且 `name` 应为表单字段名（如 `'file'`），而不是文件名
> - ✅ `files: [{ file: file.file, name: 'file' }]` — 正确写法

**参数说明**

| 参数       | 参数类型 | 必填                           | 说明                                                                   | 平台差异说明 |
| ---------- | -------- | ------------------------------ | ---------------------------------------------------------------------- | ------------ |
| url        | String   | 是                             | 开发者服务器 url                                                       |              |
| files      | Array    | 是（files 和 filePath 选其一） | 需要上传的文件列表。**使用 files 时，filePath 和 name 不生效。**       | 仅 H5 支持   |
| filePath   | String   | 是（files 和 filePath 选其一） | 要上传文件资源的路径 （推荐使用）                                      |              |
| name       | String   | 是                             | 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容 |              |
| headers    | Object   | 否                             | 设置请求的 header，header 中不能设置 Referer                           |
| timeout    | Number   | 否                             | 请求超时的毫秒数                                                       |
| formData   | Object   | 否                             | HTTP 请求中其他额外的 form data                                        |
| data       | Object   | 否                             | 请求参数，会序列化后加入 formData 中                                   |
| antiReplay | Boolean  | 否                             | 附件上传是否带上防重放标记，默认 true                                  |
| success    | Function | 否                             | 接口调用成功的回调函数                                                 |
| error      | Function | 否                             | 接口调用失败的回调函数                                                 |
| complete   | Function | 否                             | 接口调用结束的回调函数（调用成功、失败都会执行）                       |
| uploading  | Function | 否                             | 文件上传时，进度回调                                                   |              |

**注意**

-   `name` 参数是**表单字段名**（key），服务器端通过此 key 获取文件内容，而**不是文件名**。例如 `name: 'file'`，服务器端通过 `file` 字段获取上传的文件。
-   微信小程序只支持单文件上传，传多个文件需要反复调用本 API。所以跨端的写法就是循环调用本 API。
-   网络请求的 超时时间 可以统一在 `manifest.json` 中配置

**files 参数说明**

files 参数是一个 file 对象的数组，file 对象的结构如下：

| 参数名 | 类型   | 必填 | 说明                                                                                    |
| :----- | :----- | :--- | :-------------------------------------------------------------------------------------- |
| name   | String | 否   | multipart 提交时，表单的项目名，默认为 file                                             |
| file   | File   | 否   | 要上传的文件对象，**必须是原始 File/Blob 对象**（em-uploader 中通过 `file.file` 获取），仅 H5 支持 |
| uri    | String | 是   | 文件的本地地址                                                                          |

### Util.upload 支持空附件上传

`v8.3.14` 版本开始，Util.upload 附件上传支持空附件上传。

某些项目场景下，表单与附件一起上传，同时附件为非必填项，请求参数要求 formData 形式，此时进上传表单数据时，原有的 Util.upload 会报错。

`v8.3.14`版本之后可以使用 Util.upload 进行这类场景下调用，可以保证参数为 formData 格式，附件非必填。支持 H5、微信、支付宝小程序跨端场景。
