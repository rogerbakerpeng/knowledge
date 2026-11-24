import mixinH5 from '../mixinH5';
import mixin from '../../src/mixin';

const h5 = {} as EJSNamespace.EJSType;

mixin(h5);
mixinH5(h5);

export default h5;
