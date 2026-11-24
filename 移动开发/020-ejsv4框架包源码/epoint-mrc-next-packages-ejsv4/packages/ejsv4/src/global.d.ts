// 声明ejs中用到的全局变量，主要修复rollup编译时ts报错问题
declare const EJS_VERSION: string;
declare interface Window {
    webkitRequestAnimationFrame(callback: any): void;
    mozRequestAnimationFrame(callback: any): void;
    oRequestAnimationFrame(callback: any): void;
    webkitCancelAnimationFrame(callback: any): void;
    mozCancelAnimationFrame(callback: any): void;
    oCancelAnimationFrame(callback: any): void;
    webkit: any;
    JSBridge: EJSNamespace.JSBridgeType;
    dd: any;
    ejs: EJSNamespace.EJSType;
    Vue: any;
    vm: any;
    ejs_xm_orientation: number;
    wx: any;
    di18n: any;
    appendIframe: any;
    delIframe: any;
}
declare const xm: any;
declare const wx: any;
declare const my: any;
declare const CryptoJS: any;
declare const mui: any;
declare const dd: any;
declare const epm: any;
