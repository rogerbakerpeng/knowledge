import mixinUni from '../mixinUni';
import mixinNative from '../mixinEjs';
import mixin from '../../src/mixin';

const ejsUni = {} as EJSNamespace.EJSType;

mixin(ejsUni);
mixinUni(ejsUni);
mixinNative(ejsUni);

export default ejsUni;
