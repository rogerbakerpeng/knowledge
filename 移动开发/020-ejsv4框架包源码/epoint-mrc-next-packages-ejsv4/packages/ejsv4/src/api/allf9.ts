import uiMixin from './h5/ui';
import pageMixin from './f9/page';
import storageMixin from './h5/storage';
import deviceMixin from './h5/device';
import utilMixin from './f9/util';
import navigatorMixin from './f9/navigator';
import authMixin from './f9/auth';
import contact from './f9/contact';

const hybridJs = window.ejs;

uiMixin(hybridJs);
authMixin(hybridJs);
pageMixin(hybridJs);
storageMixin(hybridJs);
deviceMixin(hybridJs);
utilMixin(hybridJs);
navigatorMixin(hybridJs);
contact(hybridJs);
