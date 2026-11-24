import authMixin from '../src/api/xm/auth';
import deviceMixin from '../src/api/xm/device';
import ioMixin from '../src/api/xm/io';
import navigatorMixin from '../src/api/xm/navigator';
import pageMixin from '../src/api/xm/page';
import miniH5Mixin from '../src/api/xm/miniH5';
import runtimeMixin from '../src/api/xm/runtime';
import storageMixin from '../src/api/xm/storage';
import utilMixin from '../src/api/xm/util';
import uiMixin from '../src/api/xm/ui';
import streamMixin from '../src/api/xm/stream';
import audioMixin from '../src/api/xm/audio';
import eventMixin from '../src/api/xm/event';

export default function mixinXm(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    authMixin(hybridJs);
    deviceMixin(hybridJs);
    eventMixin(hybridJs);
    ioMixin(hybridJs);
    navigatorMixin(hybridJs);
    pageMixin(hybridJs);
    miniH5Mixin(hybridJs);
    runtimeMixin(hybridJs);
    storageMixin(hybridJs);
    utilMixin(hybridJs);
    uiMixin(hybridJs);
    streamMixin(hybridJs);
    audioMixin(hybridJs);
}