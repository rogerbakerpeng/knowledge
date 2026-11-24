import mixinH5 from '../mixinH5';
import mixinXm from '../mixinXm';
import mixinNative from '../mixinEjs';
import mixin from '../../src/mixin';

const ejsXmH5 = {} as EJSNamespace.EJSType;

mixin(ejsXmH5);
mixinH5(ejsXmH5);
mixinXm(ejsXmH5);
mixinNative(ejsXmH5);

export default ejsXmH5;
