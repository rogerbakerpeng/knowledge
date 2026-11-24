export default function audioMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('audio', [
        {
            namespace: 'startRecord',
            os: ['ejs'],
            support: '3.1.2',
            defaultParams: {
                minDuration: 1,
                maxDuration: 120,
                folderPath: '',
                fileName: ''
            }
        },
        {
            namespace: 'stopRecord',
            os: ['ejs'],
            support: '3.1.2'
        },
        {
            namespace: 'cancelRecord',
            os: ['ejs'],
            support: '3.1.2'
        },
        {
            namespace: 'startPlay',
            os: ['ejs'],
            support: '3.1.2',
            defaultParams: {
                path: ''
            }
        },
        {
            namespace: 'stopPlay',
            os: ['ejs'],
            support: '3.1.2',
            defaultParams: {
                path: ''
            }
        }
    ]);
}
