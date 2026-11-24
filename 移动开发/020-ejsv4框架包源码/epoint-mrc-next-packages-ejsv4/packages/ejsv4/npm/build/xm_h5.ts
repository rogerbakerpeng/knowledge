import mixinH5 from '../mixinH5';
import mixinXm from '../mixinXm';
import mixin from '../../src/mixin';

const xmH5 = {} as EJSNamespace.EJSType;

mixin(xmH5);
mixinH5(xmH5);
mixinXm(xmH5);

export default xmH5;
