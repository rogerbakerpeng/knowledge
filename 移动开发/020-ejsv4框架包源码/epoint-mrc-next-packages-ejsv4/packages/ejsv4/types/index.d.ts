/// <reference path="./audio.d.ts" />
/// <reference path="./auth.d.ts" />
/// <reference path="./device.d.ts" />
/// <reference path="./event.d.ts" />
/// <reference path="./io.d.ts" />
/// <reference path="./navigator.d.ts" />
/// <reference path="./page.d.ts" />
/// <reference path="./runtime.d.ts" />
/// <reference path="./storage.d.ts" />
/// <reference path="./stream.d.ts" />
/// <reference path="./ui.d.ts" />
/// <reference path="./util.d.ts" />
/// <reference path="./basicCard.d.ts" />
/// <reference path="./contact.d.ts" />
/// <reference path="./miniH5.d.ts" />

declare namespace EJSNamespace {
    interface OsType {
        [key: string]: boolean | string;
    }
    interface Callback {
        (result?: any): void;
    }
    interface CallbacksType {
        [key: number | string]: Callback;
    }

    type IsOptional<T, K extends keyof T> = { [K1 in Exclude<keyof T, K>]: T[K1] } & { [P in K]?: T[P] } extends T
        ? true
        : false;
    type IsAllOptional<T> = {
        [K in keyof T]: IsOptional<T, K>;
    } extends {
        [K in keyof T]: true;
    }
        ? true
        : false;

    type APIOptType<T, R> = T & {
        success?: (result: R) => void;
        error?: Callback;
    };

    type APIType<T, R> = IsAllOptional<T> extends true
        ? (options?: APIOptType<T, R>) => Promise<R>
        : (options: APIOptType<T, R>) => Promise<R>;
    type APIStrType<T, R, S extends any[], isLongCb> = (
        ...rest: IsAllOptional<T> extends true ? [] | [APIOptType<T, R>] | S : [APIOptType<T, R>] | S
    ) => isLongCb extends true ? void : Promise<R>;
    type APILongCbType<T, R> = (
        options: T & {
            success: (result: R) => void;
            error?: Callback;
        }
    ) => void;

    interface RunCodeType {
        (option?: any, resolve?: typeof Promise.resolve, reject?: typeof Promise.reject): void;
    }

    interface apiOpt {
        /**
         * 模块名，例如 ui
         */
        moduleName?: string;
        /**
         * 命名空间，必填，例如 actionSheet
         */
        namespace: string;
        /**
         * 支持的环境, 必填
         */
        os: string[];
        /**
         * 支持的原生 ejs 最低版本号，选填
         */
        support?: string;
        /**
         * API 的默认传参，选填
         */
        defaultParams?: object;
        /**
         * API 的实现方法，选填，如不传该 API 默认调用原生方法实现
         */
        runCode?: RunCodeType;
    }

    interface JSBridgeType {
        /**
         * 参数函数回调集合
         */
        functionCallbacks: {
            [key: number | string]: number[];
        };
        /**
         * 本地注册的方法集合,原生只能调用本地注册的方法,否则会提示错误
         */
        messageHandlers: CallbacksType;
        /**
         * 短期回调函数集合, 在原生调用完对应的方法后,会执行对应的回调函数id，并删除
         */
        responseCallbacks: CallbacksType;
        /**
         * 长期存在的回调，调用后不会删除
         */
        responseCallbacksLongTerm: CallbacksType;
        /**
         * 调用原生开放的方法
         * @param proto 协议
         * @param handlerName 方法名
         * @param data 传参
         * @param callback 回调
         * @returns
         */
        callHandler: (proto: string, handlerName: string, data: object, callback: number | Callback) => void;
        /**
         * 获得本地的长期回调, 每一次都是一个唯一的值
         */
        getLongCallbackId: () => number;
        /**
         * 注册本地JS方法通过JSBridge给原生调用。
         * 我们规定, 原生必须通过JSBridge来调用H5的方法。
         * 注意, 这里一般对本地函数有一些要求, 要求第一个参数是data, 第二个参数是callback。
         * @param handlerName 方法名
         * @param handler 回调
         * @returns
         */
        registerHandler: (handlerName: string, handler: Callback) => void;
        /**
         * 注册长期回调到本地
         * @param callbackId 回调id
         * @param callback 回调
         * @returns
         */
        registerLongCallback: (callbackId: string, callback: Callback) => void;
        /**
         * 原生调用H5页面注册的方法,或者调用回调方法
         * @param messageJSON 原生传递的结果
         * @returns
         */
        _handleMessageFromNative: (messageJSON: string) => void;
        /**
         * 函数参数执行回调
         * @param messageJSON 原生传递的结果
         * @returns
         */
        _handleParamCallbackMessageFromNative: (messageJSON: string) => void;
        /**
         * 用于给原生在iframe跨域情况下给ejs的回调信息
         * @param messageJSON 原生传递的结果
         * @returns
         */
        _handlePostMessage: (messageJSON: any) => void;
    }

    interface EJSType {
        /**
         * 供API内部调用，h5和原生交互，jsbridge核心代码
         */
        JSBridge?: JSBridgeType;
        /**
         * 供API内部调用，Promise构造函数
         */
        Promise: typeof Promise;
        /**
         * 供API内部调用，Proxy构造函数。
         * 对所有的API进行统一参数预处理，promise逻辑支持等操作
         */
        Proxy: {
            new (api: apiOpt, callback: Callback): {
                api: apiOpt;
                apiName: string;
                callback: Callback;
                walk: (hy: EJSType) => (...rest: any[]) => void | Promise<void>;
                dispose: () => void;
            };
        };
        /**
         * 添加拦截器
         *
         * @param apiname 需要添加拦截器的 api 名称，示例：ui.actionSheet
         * @param opt 拦截器配置，可配置invoke、success、error
         *
         * @support 全端兼容，EJS >= 4.2.1
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global)
         * @example ```typescript
         *    ejs.addInterceptors('ui.actionSheet', {
         *        invoke(args) {
         *            // 调用前拦截, 修改传参
         *            args[0].items = ['远野贵树', '篠原明里', '澄田花苗'];
         *        },
         *        success(res) {
         *            // 成功回调拦截, 修改结果
         *            res.which = -1;
         *            res.content = '拦截器的结果';
         *        },
         *        error(err) {
         *            // 失败回调拦截
         *            console.log(err);
         *        }
         *    });
         * ```
         *
         * @tips
         * 1、若添加了多个同类型拦截器，调用时会一一触发。
         *
         * 2、调用时，所有invoke拦截器都会被一一触发，若所有拦截器都通过，即它们都没有返回false，则正常调用 API，反之则会中断 API 调用，逻辑类似Promise.all。
         *
         * 3、成功拦截和失败拦截仅支持规范的传递对象的调用方式，如ejs.ui.toast('信息')这样传递字符串的快速调用方式不支持。
         *
         * 4、建议在调用 API 之前添加拦截器，否则如事件监听这类 API 的成功回调，后添加的拦截器无法进行拦截，需要重新调用 API 进行事件注册。
         *
         * 5、拓展 API 同样可以使用拦截器，前提是需要符合以下规范：
         *
         *   （1）调用时向 API 传递的参数必须是一个对象，否则拦截器无法修改传参。
         *
         *   （2）成功和失败回调的拦截功能，前提是拓展 API 支持成功和失败的回调，若runCode中没有触发成功失败回调，则也不支持两种类型的拦截。
         *
         *   （3）成功和失败回调的参数请设置为对象，否则拦截器也无法修改回调的结果。
         */
        addInterceptors: (
            /**
             * 需要添加拦截器的 api 名称，示例：ui.actionSheet
             */
            apiname: string,
            /**
             * 拦截器配置，可配置invoke、success、error
             */
            opt: {
                /**
                 * api 调用前触发，同步调用时：返回 false 代表中断调用，返回 true 或不返回则继续调用；异步调用时：需要返回一个 Promise，是否继续调用取决于该 Promise 的状态
                 */
                invoke?: (args: any) => void | boolean;
                /**
                 * 成功回调前触发
                 */
                success?: Callback;
                /**
                 * 失败回调前触发
                 */
                error?: Callback;
            }
        ) => void;
        /**
         * 小程序生命周期事件
         *
         * @param params 小程序生命周期配置
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |    支持(4.0.0)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_app](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_app)
         * @example ```typescript
         *    ejs.app({
         *        onLaunch: function () {
         *            console.log('小程序启动了');
         *        },
         *        onShow: function () {
         *            console.log('页面显示了');
         *        },
         *        onHide: function () {
         *            console.log('页面隐藏了');
         *        },
         *        onClose: function () {
         *            console.log('关闭小程序');
         *        }
         *    });
         * ```
         *
         * @tips H5 或其他小程序平台，可以使用跨端框架新增的生命周期选项: [http://app.epoint.com.cn/m8mpdoc/?file=001-%E9%A1%B5%E9%9D%A2%E5%BC%80%E5%8F%91/009-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F](http://app.epoint.com.cn/m8mpdoc/?file=001-%E9%A1%B5%E9%9D%A2%E5%BC%80%E5%8F%91/009-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
         */
        app: (params: {
            /**
             * 小程序打开时触发
             */
            onLaunch?: () => void;
            /**
             * 当页面显示时触发
             */
            onShow?: () => void;
            /**
             * 当页面隐藏时触发
             */
            onHide?: () => void;
            /**
             * 当关闭小程序时触发
             */
            onClose?: () => void;
        }) => void;
        /**
         * audio音频模块
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio)
         */
        audio?: audioType;
        /**
         * auth模块
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth)
         */
        auth?: authType;
        /**
         * basicCard模块
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_basicCard](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_basicCard)
         */
        basicCard?: basicCardType;
        /**
         * 调用自定义 API，只能调用EJS环境下的 API
         *
         * 注，请不要调尝试用框架标准 API，以下仅作示例
         *
         * @support 仅EJS环境支持
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global)
         * @example ```typescript
         *    ejs.callApi({
         *      name: 'alert',
         *      mudule: 'ui',
         *      isLongCb: 0,
         *      data: {
         *          title: '标题',
         *          message: '信息',
         *      },
         *      success: function (result) {
         *          // 回调的参数由具体的自定义API决定
         *      },
         *      error: function (error) {}
         *    });
         * ```
         */
        callApi: APIType<
            {
                /**
                 * API的名字，例如 alert
                 */
                name: string;
                /**
                 * API的模块名, 例如 ui
                 */
                mudule: string;
                /**
                 * 是否是长期回调，1代表长期回调，0代表短期回调，短期回调调用一次后会自动回收，长期回调可以一直触发，默认为0
                 */
                isLongCb?: number;
                /**
                 * 需要传递给原生的数据，例如 { key1: "value1" }，具体数据由对应 API 决定
                 */
                data?: object;
                /**
                 * 容器版本，用于容器组件版本校验
                 */
                appVersion?: string;
            },
            any
        >;
        /**
         * 供API内部调用的，this指针被指向了proxy对象，方便处理
         */
        callInner?: RunCodeType;
        /**
         * 供API内部调用，同callApi, 调用原生自定义API
         */
        callNativeApi?: EJSType['callApi'];
        /**
         * 初始化校验，必须调用
         *
         * @param params 鉴权配置
         *
         * 注，如果没有组件API需要注册，可以传空，注册组件时，必须容器支持对应组件才能注册成功。
         *
         * 同时，config内部也会进行一些其它验证，譬如白名单验证（根据实际需求而定），如果没有通过验证，则无法触发ready。
         *
         * 另外，在钉钉、企业微信和政务微信下可使用自动化鉴权功能，否则降级成为调用后直接触发ready回调。
         *
         * @support 除了官方weex端外，其他端都兼容
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global)
         * @example ```typescript
         *    ejs.config({
         *      isAutoConfig: 0,
         *      preUrl: 'http://192.168.217.151/950ePaaS/',
         *      token: '123456',
         *      ajax: Util.ajax,
         *      agentId: '123',
         *      jsApiList: [
         *          {
         *              pay: ejs.os.ios ? 'EJSPayApi' : 'com.epoint.ejs.api.PayApi'
         *          }
         *      ]
         *    });
         * ```
         *
         * @tips
         *
         * 1、小程序应用的API不需要鉴权
         *
         * 2、在EJS容器中，H5应用除了部分API不需要权限外，其余API都需要权限校验成功后才能调用（也就是ready之后）
         *
         * 3、H5和DD下的兼容API都不需要权限。
         *
         * 4、ISV应用不能调用EJS系统级API
         */
        config: (params: {
            /**
             * 非ejs环境下是否使用自动化鉴权功能，示例：1、0
             *
             * @support 仅钉钉、企业微信和政务微信支持
             */
            isAutoConfig?: number;
            /**
             * 自动化鉴权时需要提供统一认证地址，示例：http://192.168.217.151/950ePaaS/
             *
             * @support 仅钉钉、企业微信和政务微信支持
             */
            preUrl?: string;
            /**
             * 自动化鉴权时需要提供token，可选;
             * 传入框架封装的ajax方法时可进行自动代理，自动代理情况下不必传入token，若传了token，则会使用传入的token。
             *
             * @support 仅钉钉、企业微信和政务微信支持
             */
            token?: string;
            /**
             * 自动化鉴权时需传入封装的ajax方法，用于请求接口
             *
             * @support 仅钉钉、企业微信和政务微信支持
             */
            ajax?: any;
            /**
             * 政务微信或企业微信进行应用身份鉴权时需要传递应用id
             *
             * @support 仅企业微信和政务微信支持
             */
            agentId?: string;
            /**
             * 需要注册的组件 API 信息，除了框架中的组件外，其它新增的组件使用时都需要通过这个入口注册；
             *
             * jsApiList中每一个item的参数为key、value形式，其中value为对应类的包名，Android和iOS下有区别；
             *
             * 在钉钉、企业微信和政务微信下传入需要调用的API。
             */
            jsApiList?: {
                [key: string]: string;
            }[];
            /**
             * 支持个性化传参
             */
            [x: string]: any;
        }) => void;
        /**
         * contact模块
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_contact](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_contact)
         */
        contact?: contactType;
        /**
         * device模块
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         */
        device?: deviceType;
        /**
         * 处理错误信息，ejs.error参数为回调函数，在容器或EJS框架捕获到错误时，都会触发这个回调
         * @param callback 回调函数
         * @returns
         * @support 全端兼容
         */
        error: (callback: Callback) => void;
        /**
         * event模块
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event)
         */
        event?: eventType;
        /**
         * 供API内部调用，在某一个模块下拓展一个API
         * @param moduleName 模块名
         * @param apiParam 方法参数
         * @param hy ejs对象
         * @returns
         */
        extendApi: (moduleName: string, apiParam: apiOpt, hy: EJSType) => void;
        /**
         * 拓展模块 API。若需要在 ejs 上拓展一个新模块，或者在已有的模块上拓展一个 API，可以调用该方法
         *
         * @param moduleName 模块名
         * @param apis 模块下拓展的 API 数组
         *
         * @support 全端兼容
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global)
         * @example ```typescript
         *    ejs.extendModule('device', [
         *      {
         *          namespace: 'callPhone',
         *          os: ['h5'],
         *          defaultParams: {
         *              phoneNum: ''
         *          },
         *          runCode(options, resolve, reject) {
         *              // 函数调用后执行的方法，回调参数第一项是函数调用时的传参，可能有第二个参数是 resolve，用于支持 promise 调用
         *              const phoneNum = options.phoneNum;
         *              window.location.href = `tel:${phoneNum}`;
         *              options.success && options.success();
         *              resolve && resolve();
         *          }
         *      }
         *     ]);
         * ```
         *
         * @tips ejs框架默认支持的环境列表：
         *
         * [
         *
         *      dd,	            // 钉钉
         *
         *      xm,	            // 迅盟
         *
         *      wxWorkLocal,	// 政务微信
         *
         *      wxWork,	        // 企业微信
         *
         *      wechat,	        // 微信
         *
         *      welink,	        // welink 容器
         *
         *      ddGov,	        // 政务钉钉
         *
         *      alipay,	        // 支付宝容器
         *
         *      miniH5,	        // 新点小程序
         *
         *      primordial,	    // ejs 原生门户
         *
         *      ejs,	        // ejs 原生容器
         *
         *      h5	            // H5 环境
         *
         * ]
         */
        extendModule: (
            /**
             * 模块的名称
             */
            moduleName: string,
            /**
             * 模块下拓展的 API 数组
             */
            apis: apiOpt[]
        ) => void;
        /**
         * 拓展 OS。拓展 API 时，若该 API 支持的环境不在目前支持的环境列表中，则需要拓展一个新的支持环境，可以调用该方法进行拓展
         *
         * @param os 支持的环境参数，必填
         * @param cb 拓展时调用的回调函数，必填
         *
         * @support 全端兼容，支持版本 EJS >= 4.1.9-sp1
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global)
         * @example ```typescript
         *    ejs.extendOS('ejs', function (os) {
         *      const ejs = navigator.userAgent.match(/EpointEJS/i);
         *      if (ejs) {
         *          os.ejs = true;
         *      }
         *    });
         * ```
         */
        extendOS: (
            /**
             * 支持的环境参数，必填
             */
            os: string,
            /**
             * 拓展时调用的回调函数，必填
             */
            cb: (os: OsType) => void
        ) => void;
        /**
         * 供API内部调用，获取Promise
         */
        getPromise: () => typeof Promise;
        /**
         * 供API内部调用，全局错误提示
         */
        globalError: {
            [key: string]: {
                code: number;
                msg: string;
            };
        };
        /**
         * 供API内部调用，内部工具方法
         */
        innerUtil: {
            extend(target: any, ...nums: any): any;
            isObject(object: any): boolean;
            getFullPath(path: string): string;
            getFullUrlByParams(url: string, data: any, type?: boolean): string;
            eclipseText(str: string, count: number): string;
            compatibleStringParamsToObject(args: any, ...rest: any): any;
            eclipseButtonsNumber(arr: [], maximum: number): [];
            getBase64NotUrl(base64: string): string;
        };
        /**
         * io模块
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io)
         */
        io?: ioType;
        /**
         * miniH5模块
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5)
         */
        miniH5?: miniH5Type;
        /**
         * navigator模块
         *
         * 该模块针对 EJS 原生导航栏提供系列 API，供 H5 开发使用。而在非 EJS 环境中，只兼容了很小一部分功能，ejs-weex 环境不支持。
         *
         * 对于其他平台修改导航栏标题样式，在跨端框架中，可以通过配置pages.json或者使用页面配置节点navigation-bar来进行修改，也可以隐藏原生导航栏（支付宝小程序不支持隐藏导航栏），自定义导航栏来完成更复杂的样式功能。
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         */
        navigator?: navigatorType;
        /**
         * 判断当前的运行环境
         *
         * @support 全端兼容
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global)
         * @example ```typescript
         *    系统环境判断
         *    // Android环境与iOS只会有一个为true
         *    ejs.os.android;
         *    ejs.os.ios;
         *    // 鸿蒙环境判断在4.2.19-beta.1版本开始支持
         *    ejs.os.harmonyOs;
         *
         *    容器环境判断
         *    // 在对应的容器中对应字段会为true
         *    // `EJS`容器
         *    ejs.os.ejs;
         *    // epoint小程序容器
         *    ejs.os.miniH5;
         *    // 卡片加载环境是否是原生门户
         *    ejs.os.ejsCard;
         *    // `钉钉`容器
         *    ejs.os.dd;
         *    // `微信`容器
         *    ejs.os.wechat;
         *    // `企业微信`容器
         *    ejs.os.wxWork;
         *    // `政务微信`容器
         *    ejs.os.wxWorkLocal;
         *    // welink容器
         *    ejs.os.welink;
         *    // 讯盟容器
         *    ejs.os.xm;
         *    // 政务钉钉容器
         *    ejs.os.ddGov;
         *    // 支付宝容器
         *    ejs.os.alipay;
         *    // 如果ejs和钉钉都不是，则默认是h5环境, `其它`(包括普通浏览器)容器
         *    ejs.os.h5;
         *
         *    更多功能
         *    // Android环境下
         *    // 获取Android的版本号以及是否是非Chrome的Android环境
         *    ejs.os.version;
         *    ejs.os.isBadAndroid;
         *    // iOS环境下
         *    // 获取iOS的版本号以及是否是苹果手机，是否是pad
         *    ejs.os.version;
         *    ejs.os.iphone;
         *    ejs.os.ipad;
         *    // 无windows环境，一般指其他平台的小程序环境
         *    ejs.os.miniprogram;
         * ```
         */
        os: OsType;
        /**
         * page模块
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page)
         */
        page: pageType;
        /**
         * 验证成功后的回调，ejs.ready参数为回调函数，在初始化完毕，并且config验证完毕后会触发，任何相关操作请在回调函数后执行
         *
         * 如果验证失败，不会走ready，而是会走error
         *
         * ready只会触发一次，所以如果同时设置两个，第二个ready回调会无效。
         *
         * @param callback 回调函数
         *
         * @support 除了官方weex端外，其他端都兼容
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global)
         * @example ```typescript
         *    ejs.ready(function () {
         *      // TODO: 处理成功后的逻辑，ejs需要权限的API只有在ready触发后才能被正确调用
         *    });
         * ```
         */
        ready: (callback: Callback) => void;
        /**
         * 删除拦截器
         *
         * @param apiname 需要删除拦截器的 api 名称，示例：ui.toast
         * @param type 需要删除的拦截器类型，不填则删除该 API 所有类型拦截器，可选值：invoke、success、error
         *
         * @support 全端兼容，支持版本 EJS >= 4.2.1
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_global)
         * @example ```typescript
         *    ejs.removeInterceptors('ui.toast', 'invoke');
         * ```
         */
        removeInterceptors: (
            /**
             * 需要删除拦截器的 api 名称，示例：ui.toast
             */
            apiname: string,
            /**
             * 需要删除的拦截器类型，不填则删除该 API 所有类型拦截器，
             * 可选值：invoke、success、error
             */
            type?: string
        ) => void;
        /**
         * runtime模块
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         */
        runtime?: runtimeType;
        /**
         * 供API内部调用，设置Promise
         * @param newPromise Promise
         * @returns
         */
        setPromise: (newPromise: typeof Promise) => void;
        /**
         * 供API内部调用，提示全局错误
         * @param code 错误码
         * @param msg 错误提示信息
         * @returns
         */
        showError: (code: number, msg: string) => void;
        /**
         * storage模块
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage)
         *
         * EJS容器下的存储，原生容器中的键值对，必须通过storageAPI 才能获取出来
         *
         * 如果需要获取或修改框架键值对，建议通过自定义 API 方式
         *
         * 注意:
         *
         * 1. 在H5和DD下，为localStorage，浏览器限制 5M 大小，是缓存概念，可能会被清理;
         *
         * 2. EJS容器下的存储，必须通过storageAPI 才能获取出来，无大小限制，不是缓存，是持久化的；
         *
         * 3. 各个小程序端为其自带的 storage api，数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。
         *
         * 4. 微信小程序单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB；
         *
         * 5. 支付宝小程序单条数据转换成字符串后，字符串长度最大 200*1024。同一个支付宝用户，同一个小程序缓存总上限为 10MB。
         */
        storage?: storageType;
        /**
         * stream模块
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_stream](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_stream)
         */
        stream?: streamType;
        /**
         * 供API内部调用，支持的os列表，数组的顺序很重要，不能随便修改
         */
        supportOsArray: string[];
        /**
         * ui模块
         *
         * 该模块传递参数`h5UI: true`时需要引入包含 H5 环境的库。
         *
         * **注意：在跨端框架中 UI 模块调用的是跨端组件，请不要在 beforeCreate、created、beforeMount、onLoad 等生命周期中调用该模块 API，此时页面节点未渲染，必须在 mounted 及其之后中调用**
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         */
        ui: uiType;
        /**
         * util模块
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         */
        util?: utilType;
        /**
         * ejs版本号
         */
        version: string;
        /**
         * 支持拓展其他模块
         */
        [key: string]: any;
    }
}

/**
 * ejs库
 *
 * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=changelog](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=changelog)
 */
declare const ejs: EJSNamespace.EJSType;

declare module '@epoint-mrc/ejsv4' {
    export const ejs: EJSNamespace.EJSType;
}
