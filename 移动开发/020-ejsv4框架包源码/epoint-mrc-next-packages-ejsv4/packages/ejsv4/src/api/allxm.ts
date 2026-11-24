import authMixin from './xm/auth';
import deviceMixin from './xm/device';
import ioMixin from './xm/io';
import navigatorMixin from './xm/navigator';
import pageMixin from './xm/page';
import miniH5Mixin from './xm/miniH5';
import runtimeMixin from './xm/runtime';
import storageMixin from './xm/storage';
import utilMixin from './xm/util';
import uiMixin from './xm/ui';
import streamMixin from './xm/stream';
import audioMixin from './xm/audio';
import eventMixin from './xm/event';

const hybridJs = window.ejs;

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
