import mixinH5 from '../mixinH5';
import mixinNative from '../mixinEjs';
import mixin from '../../src/mixin';

const ejsH5 = {} as EJSNamespace.EJSType;

mixin(ejsH5);
mixinH5(ejsH5);
mixinNative(ejsH5);

export default ejsH5;
