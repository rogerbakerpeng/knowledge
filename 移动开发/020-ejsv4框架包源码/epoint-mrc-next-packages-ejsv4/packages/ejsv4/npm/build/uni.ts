import mixinUni from '../mixinUni';
import mixin from '../../src/mixin';

const uni = {} as EJSNamespace.EJSType;

mixin(uni);
mixinUni(uni);

export default uni;
