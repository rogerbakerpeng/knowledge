import mixinH5 from './mixinH5';
import mixinDD from './mixinDD';
import mixinNative from './mixinNative';
import mixinXm from './mixinXm';
import mixin from '../src/mixin';

const ejs = {} as EJSNamespace.EJSType;

mixin(ejs);
mixinH5(ejs);
mixinDD(ejs);
mixinNative(ejs);
mixinXm(ejs);

const h5 = ejs,
    dd = ejs,
    /* eslint-disable camelcase */
    ejs_h5 = ejs,
    dd_h5 = ejs,
    ejs_dd_h5 = ejs,
    ejs_xm_h5 = ejs;

export default {
    h5,
    ejs,
    dd,
    ejs_h5,
    dd_h5,
    ejs_dd_h5,
    ejs_xm_h5
};
