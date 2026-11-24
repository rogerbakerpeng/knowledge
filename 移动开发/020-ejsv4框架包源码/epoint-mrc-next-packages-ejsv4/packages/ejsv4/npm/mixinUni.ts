import extendMixin from '../src/api/uni/index';
import uiMixin from '../src/api/uni/ui';
// import authMixin from '../src/api/uni/auth';
import runtimeMixin from '../src/api/uni/runtime';
import deviceMixin from '../src/api/uni/device';
import eventMixin from '../src/api/uni/event';
import storageMixin from '../src/api/uni/storage';
import pageMixin from '../src/api/uni/page';
import navigatorMixin from '../src/api/uni/navigator';
import utilMixin from '../src/api/uni/util';
import contactMixin from '../src/api/uni/contact';
import audioMixin from '../src/api/uni/audio';
import ioMixin from '../src/api/uni/io';
import miniH5Mixin from '../src/api/uni/miniH5';
import callnativeapiMixin from '../src/core/callnativeapi';


export default function mixinNative(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    if (hybridJs.os.weex) {
        return;
    }

    // 引入 callApi 支持
    callnativeapiMixin(hybridJs);

    extendMixin(hybridJs);
    uiMixin(hybridJs);
    // authMixin(hybridJs);
    runtimeMixin(hybridJs);
    deviceMixin(hybridJs);
    eventMixin(hybridJs);
    storageMixin(hybridJs);
    pageMixin(hybridJs);
    navigatorMixin(hybridJs);
    utilMixin(hybridJs);
    contactMixin(hybridJs);
    audioMixin(hybridJs);
    ioMixin(hybridJs);
    miniH5Mixin(hybridJs);
}
