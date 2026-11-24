import mixinNative from '../mixinEjs';
import mixin from '../../src/mixin';

export const ejs = {} as EJSNamespace.EJSType;

mixin(ejs);
mixinNative(ejs);

export default ejs;
