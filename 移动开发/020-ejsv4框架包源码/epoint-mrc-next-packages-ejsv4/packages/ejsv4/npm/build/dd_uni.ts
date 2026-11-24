import mixinUni from '../mixinUni';
import mixinDD from '../mixinDD';
import mixin from '../../src/mixin';

const ddH5 = {} as EJSNamespace.EJSType;

mixin(ddH5);
mixinUni(ddH5);
mixinDD(ddH5);

export default ddH5;
