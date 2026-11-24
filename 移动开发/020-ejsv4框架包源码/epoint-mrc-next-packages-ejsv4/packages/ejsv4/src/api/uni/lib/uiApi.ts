export default function uiApi(type, options, resolve, reject) {
    if (!EjsApi) {
        console.error('未引入跨端组件库中的EjsApi');

        return;
    }

    let success = options.success;
    let error = options.error;

    delete options.success;
    delete options.error;

    EjsApi(type, options, (res) => {
        success && success(res);
        resolve && resolve(res);
    }, (err) => {
        error && error(err);
        reject && reject(err);
    });
}