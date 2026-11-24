export default function callDDByArgs(args, api) {
    const options = args[0];
    const resolve = args[1];
    const reject = args[2];

    options.onSuccess = (result) => {
        let newResult = result;

        if (options.dataFilter) {
            newResult = options.dataFilter(result);
        }

        options.success && options.success(newResult);
        resolve && resolve(newResult);
    };
    options.onFail = (error) => {
        options.error && options.error(error);
        reject && reject(error);
    };

    api(options);
}
