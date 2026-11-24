import uiMixin from './f9dd/ui';
import deviceMixin from './f9dd/device';
import pageMixin from './f9dd/page';
import navigatorMixin from './f9dd/navigator';
import runtimeMixin from './f9dd/runtime';
import utilMixin from './f9dd/util';
import ioMixin from './f9dd/io';

const hybridJs = window.ejs;

uiMixin(hybridJs);
deviceMixin(hybridJs);
pageMixin(hybridJs);
navigatorMixin(hybridJs);
runtimeMixin(hybridJs);
utilMixin(hybridJs);
ioMixin(hybridJs);
