/* utils */

export function isNullOrUndefined(obj) {
    if (obj === null || obj === '' || obj === 'undefined') {
        return true;
    }
}

export function isNullOrEmpty(obj) {
    if (obj === null || obj === '') {
        return true;
    }
}
