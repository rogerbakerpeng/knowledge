import uiMixin from '../src/api/weex/ui';
import runtimeMixin from '../src/api/weex/runtime';
import storageMixin from '../src/api/weex/storage';
import pageMixin from '../src/api/weex/page';
import streamMixin from '../src/api/weex/stream';


export default function mixinWeex(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    if (!hybridJs.os.weex) {
        return;
    }

    uiMixin(hybridJs);
    runtimeMixin(hybridJs);
    storageMixin(hybridJs);
    pageMixin(hybridJs);
    streamMixin(hybridJs);
}
