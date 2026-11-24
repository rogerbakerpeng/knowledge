export function noop(info) {
    return info;
}

export function getI18nTxt(txt) {
    let $t = noop;

    $t = window.di18n && window.di18n.$t.bind(window.di18n) || noop;

    if (!txt || $t(txt) === 'undefined') {
        return txt;
    }

    return $t(txt);
}

