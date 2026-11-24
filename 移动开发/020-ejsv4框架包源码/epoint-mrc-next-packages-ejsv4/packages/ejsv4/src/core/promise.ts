/**
 * 不用polyfill，避免体积增大
 * @param {Object} hybrid hybrid对象
 */
export default function promiseMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    // 暂时去除默认的promise支持，防止普通开发人员不会使用导致报错无法补货
    hybridJs.Promise = Promise;

    hybridJs.getPromise = () => hybridJs.Promise;

    hybridJs.setPromise = (newPromise) => {
        hybridJs.Promise = newPromise;
    };
}
