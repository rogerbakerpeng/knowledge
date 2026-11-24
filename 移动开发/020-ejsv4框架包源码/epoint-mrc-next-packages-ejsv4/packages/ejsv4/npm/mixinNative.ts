import uiMixin from '../src/api/native/ui';
import mixinNativeCommon from './mixinNativeCommon';

export default function mixinNative(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    mixinNativeCommon(hybridJs);

    uiMixin(hybridJs);
}
