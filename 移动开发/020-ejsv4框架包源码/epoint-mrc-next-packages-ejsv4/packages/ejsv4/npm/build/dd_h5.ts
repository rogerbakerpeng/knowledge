import mixinH5 from '../mixinH5';
import mixinDD from '../mixinDD';
import mixin from '../../src/mixin';

const ddH5 = {} as EJSNamespace.EJSType;

mixin(ddH5);
mixinH5(ddH5);
mixinDD(ddH5);

export default ddH5;
