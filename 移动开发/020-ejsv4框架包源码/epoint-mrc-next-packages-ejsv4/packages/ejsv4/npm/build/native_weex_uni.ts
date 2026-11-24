import mixinUni from '../mixinUni';
import mixinNative from '../mixinNative';
import mixinWeex from '../mixinWeex';
import mixin from '../../src/mixin';

const weexUni = {} as EJSNamespace.EJSType;

mixin(weexUni);
mixinNative(weexUni);
mixinUni(weexUni);
mixinWeex(weexUni);

export default weexUni;
