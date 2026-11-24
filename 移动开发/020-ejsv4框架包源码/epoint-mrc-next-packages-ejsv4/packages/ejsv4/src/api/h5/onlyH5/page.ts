export default function onlyH5Page(hybrid) {
    const hybridJs = hybrid;

    hybridJs.extendModule('page', [
        {
            namespace: 'reload',
            os: ['h5'],
            runCode() {
                window.location.reload();
            }
        }
    ]);
}
