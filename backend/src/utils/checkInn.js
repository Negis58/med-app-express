const isInn = (inn) => {
    if (typeof inn === 'string' || typeof inn === 'number') {
        inn = inn.toString();

        if ((/^\d+$/).test(inn) === false) {
            return false;
        }

        if (inn.length === 10) {
            return inn.charAt(9) == ((
                2 * inn.charAt(0) +
                4 * inn.charAt(1) +
                10 * inn.charAt(2) +
                3 * inn.charAt(3) +
                5 * inn.charAt(4) +
                9 * inn.charAt(5) +
                4 * inn.charAt(6) +
                6 * inn.charAt(7) +
                8 * inn.charAt(8)
            ) % 11) % 10
        }

        return false;
    }
    return false;
}


module.exports = {isInn};