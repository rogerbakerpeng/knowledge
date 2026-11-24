import authMixin from '../src/api/native/auth';
import runtimeMixin from '../src/api/native/runtime';
import deviceMixin from '../src/api/native/device';
import eventMixin from '../src/api/native/event';
import storageMixin from '../src/api/native/storage';
import pageMixin from '../src/api/native/page';
import navigatorMixin from '../src/api/native/navigator';
import utilMixin from '../src/api/native/util';
import streamMixin from '../src/api/native/stream';
import contactMixin from '../src/api/native/contact';
import audioMixin from '../src/api/native/audio';
import ioMixin from '../src/api/native/io';
import miniH5Mixin from '../src/api/native/miniH5';
import basicCardMixin from '../src/api/native/basicCard';

import jsbridgeMixin from '../src/core/jsbridge';
import callinnerMixin from '../src/core/callinner';
import callnativeapiMixin from '../src/core/callnativeapi';

export default function mixinNative(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    // 依赖于showError，globalError，os
    jsbridgeMixin(hybridJs);
    // api没有runcode时的默认实现，依赖于jsbridge与os
    callinnerMixin(hybridJs);
    // 依赖于JSBridge，Promise,jsbridge
    callnativeapiMixin(hybridJs);

    authMixin(hybridJs);
    runtimeMixin(hybridJs);
    deviceMixin(hybridJs);
    eventMixin(hybridJs);
    storageMixin(hybridJs);
    pageMixin(hybridJs);
    navigatorMixin(hybridJs);
    utilMixin(hybridJs);
    streamMixin(hybridJs);
    contactMixin(hybridJs);
    audioMixin(hybridJs);
    ioMixin(hybridJs);
    miniH5Mixin(hybridJs);
    basicCardMixin(hybridJs);
}
