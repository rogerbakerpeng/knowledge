import mixinH5 from '../mixinUni';
import mixinDD from '../mixinDD';
import mixinNative from '../mixinNative';
import mixin from '../../src/mixin';

const ejsDdH5 = {} as EJSNamespace.EJSType;

mixin(ejsDdH5);
mixinH5(ejsDdH5);
mixinDD(ejsDdH5);
mixinNative(ejsDdH5);

export default ejsDdH5;
