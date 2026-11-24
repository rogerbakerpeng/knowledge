import osMixin from './core/os';
import promiseMixin from './core/promise';
import errorMixin from './core/error';
import proxyMixin from './core/proxy';
import defineapiMixin from './core/defineapi';
import initMixin from './core/init';
import innerUtilMixin from './core/innerutil';
import wxEventMixin from './api/wxWork/event';
import ddEventMixin from './api/dd/event';
import ejsEventMixin from './api/native/config';
import { ejsVersion } from './version';

export default function mixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.version = ejsVersion;

    osMixin(hybridJs);
    promiseMixin(hybridJs);
    errorMixin(hybridJs);
    // 不依赖于promise，但是是否有Promise决定返回promise对象还是普通函数, 依赖于globalError
    proxyMixin(hybridJs);
    // 依赖于os，Proxy，globalError，showError，以及callInner
    defineapiMixin(hybridJs);
    // init依赖与基础库以及部分原生的API
    initMixin(hybridJs);
    // 给API快速使用的内部工具集
    innerUtilMixin(hybridJs);
    // 由于鉴权较为特殊，所以直接集成在核心代码中
    // 核心代码默认集成ejs下的config方法
    ejsEventMixin(hybridJs);
    // 核心代码默认集成政务微信下的config方法
    wxEventMixin(hybridJs);
    // 核心代码默认集成钉钉下的config方法
    ddEventMixin(hybridJs);
}
