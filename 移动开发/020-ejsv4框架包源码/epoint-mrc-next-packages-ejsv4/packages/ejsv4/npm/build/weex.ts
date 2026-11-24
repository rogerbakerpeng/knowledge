import mixinWeex from '../mixinWeex';
import mixin from '../../src/mixin';

const ejs = {} as EJSNamespace.EJSType;

mixin(ejs);
mixinWeex(ejs);

export default ejs;
