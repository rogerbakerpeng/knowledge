import uiMixin from './native/ui';
import authMixin from './native/auth';
import runtimeMixin from './native/runtime';
import deviceMixin from './native/device';
import eventMixin from './native/event';
import storageMixin from './native/storage';
import pageMixin from './native/page';
import navigatorMixin from './native/navigator';
import utilMixin from './native/util';
import streamMixin from './native/stream';
import contactMixin from './native/contact';
import audioMixin from './native/audio';
import ioMixin from './native/io';
import miniH5Mixin from './native/miniH5';
import basicCardMixin from './native/basicCard';

import jsbridgeMixin from '../core/jsbridge';
import callinnerMixin from '../core/callinner';
import callnativeapiMixin from '../core/callnativeapi';

const hybridJs = window.ejs;

// 依赖于showError，globalError，os
jsbridgeMixin(hybridJs);
// api没有runcode时的默认实现，依赖于jsbridge与os
callinnerMixin(hybridJs);
// 依赖于JSBridge，Promise,jsbridge
callnativeapiMixin(hybridJs);

uiMixin(hybridJs);
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
