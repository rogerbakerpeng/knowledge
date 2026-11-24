import mixinNative from '../mixinNative';
import mixin from '../../src/mixin';

const ejs = {} as EJSNamespace.EJSType;

mixin(ejs);
mixinNative(ejs);

export default ejs;
