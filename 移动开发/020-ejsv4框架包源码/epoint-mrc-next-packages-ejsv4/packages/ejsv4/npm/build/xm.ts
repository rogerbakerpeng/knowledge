import mixinXm from '../mixinXm';
import mixin from '../../src/mixin';

const xm = {} as EJSNamespace.EJSType;

mixin(xm);
mixinXm(xm);

export default xm;
