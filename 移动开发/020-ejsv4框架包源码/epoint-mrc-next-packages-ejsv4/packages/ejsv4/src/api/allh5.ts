import uiMixin from './h5/ui';
import pageMixin from './h5/page';
import storageMixin from './h5/storage';
import deviceMixin from './h5/device';
import utilMixin from './h5/util';
import contactMixin from './h5/contact';

const hybridJs = window.ejs;

uiMixin(hybridJs);
pageMixin(hybridJs);
storageMixin(hybridJs);
deviceMixin(hybridJs);
utilMixin(hybridJs);
contactMixin(hybridJs);
