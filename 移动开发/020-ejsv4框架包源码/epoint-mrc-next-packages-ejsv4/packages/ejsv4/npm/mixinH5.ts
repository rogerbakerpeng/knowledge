import uiMixin from '../src/api/h5/ui';
import pageMixin from '../src/api/h5/page';
import storageMixin from '../src/api/h5/storage';
import deviceMixin from '../src/api/h5/device';
import utilMixin from '../src/api/h5/util';
import contactMixin from '../src/api/h5/contact';

export default function mixinH5(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    uiMixin(hybridJs);
    pageMixin(hybridJs);
    storageMixin(hybridJs);
    deviceMixin(hybridJs);
    utilMixin(hybridJs);
    contactMixin(hybridJs);
}