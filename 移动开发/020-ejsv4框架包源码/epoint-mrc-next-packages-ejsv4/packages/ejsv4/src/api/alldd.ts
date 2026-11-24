import uiMixin from './dd/ui';
import deviceMixin from './dd/device';
import pageMixin from './dd/page';
import navigatorMixin from './dd/navigator';
import runtimeMixin from './dd/runtime';

const hybridJs = window.ejs;

uiMixin(hybridJs);
deviceMixin(hybridJs);
pageMixin(hybridJs);
navigatorMixin(hybridJs);
runtimeMixin(hybridJs);
