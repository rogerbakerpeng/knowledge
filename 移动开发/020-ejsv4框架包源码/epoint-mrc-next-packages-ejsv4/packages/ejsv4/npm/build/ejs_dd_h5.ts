import mixinH5 from '../mixinH5';
import mixinDD from '../mixinDD';
import mixinNative from '../mixinEjs';
import mixin from '../../src/mixin';

const ejsDdH5 = {} as EJSNamespace.EJSType;

mixin(ejsDdH5);
mixinH5(ejsDdH5);
mixinDD(ejsDdH5);
mixinNative(ejsDdH5);

export default ejsDdH5;
