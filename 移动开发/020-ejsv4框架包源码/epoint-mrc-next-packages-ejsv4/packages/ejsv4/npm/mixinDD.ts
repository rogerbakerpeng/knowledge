import uiMixin from '../src/api/dd/ui';
import deviceMixin from '../src/api/dd/device';
import pageMixin from '../src/api/dd/page';
import navigatorMixin from '../src/api/dd/navigator';
import runtimeMixin from '../src/api/dd/runtime';

export default function mixinDD(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    uiMixin(hybridJs);
    deviceMixin(hybridJs);
    pageMixin(hybridJs);
    navigatorMixin(hybridJs);
    runtimeMixin(hybridJs);
}
