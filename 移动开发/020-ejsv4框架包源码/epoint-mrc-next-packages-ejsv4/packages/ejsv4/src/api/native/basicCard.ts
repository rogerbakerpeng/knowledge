export default function basicCardMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('basicCard', [
        {
            namespace: 'showBigCardEntrance',
            os: ['ejs'],
            support: '4.0.1'
        },
        {
            namespace: 'setBigCardTitle',
            os: ['ejs'],
            support: '4.0.1'
        },
        {
            namespace: 'setCardHeight',
            os: ['ejs'],
            support: '4.0.1'
        }
    ]);
}
