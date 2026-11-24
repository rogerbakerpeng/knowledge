export function warn(msg, err?) {
    // 模板字符串
    console.error(`[hybridJs error]: ${msg}`, err);
}

export function log(msg) {
    console.log(`[hybridJs log]: ${msg}`);
}
