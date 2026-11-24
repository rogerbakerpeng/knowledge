import mixinDD from '../mixinDD';
import mixin from '../../src/mixin';

const dd = {} as EJSNamespace.EJSType;

mixin(dd);
mixinDD(dd);

export default dd;
