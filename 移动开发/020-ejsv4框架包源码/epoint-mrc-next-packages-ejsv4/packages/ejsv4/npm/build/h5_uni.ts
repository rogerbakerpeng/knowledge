import mixinUni from '../mixinUni';
import mixin from '../../src/mixin';
import mixinH5 from '../mixinH5';

const h5Uni = {} as EJSNamespace.EJSType;

mixin(h5Uni);
mixinH5(h5Uni);
mixinUni(h5Uni);

export default h5Uni;
