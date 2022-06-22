module.exports = function toReadable(number) {

    let digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    let tys = ['ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    let ranks = ['hundred', 'thousand', 'million', 'billion'];

    if (number === 0)
        return digits[0];

    let words = new Array();
    let digit = 0;
    let pos = -1;
    let curVal = '';
    let strNumber = String(number);
    let lastTwoStr = strNumber[strNumber.length - 1];
    if (strNumber.length > 1)
        lastTwoStr = strNumber[strNumber.length - 2] + lastTwoStr;
    let lastTwoInt = parseInt(lastTwoStr);
    let isTeens = (lastTwoInt > 10 && lastTwoInt < 20);
    let isTy = (lastTwoInt === 10 || lastTwoInt >= 20);
    while (number > 0) {

        pos++;
        digit = number % 10;
        number = Math.trunc(number / 10);
        if (digit > 0) {
            if (pos === 0 && isTeens === true)
                continue;
            if (pos === 1 && isTeens === true) {
                words.push(teens[lastTwoInt - 11]);
                continue;
            }
            if (pos === 1 && isTy === true) {
                words.push(tys[Math.trunc(lastTwoInt / 10) - 1]);
                continue;
            }
            let word = digits[digit];
            if (pos === 2)
                word += (' ' + ranks[0]);
            if (pos === 3)
                word += (' ' + ranks[1]);
            if (pos === 6)
                word += (' ' + ranks[2]);
            if (pos === 9)
                word += (' ' + ranks[3]);
            words.push(word);
        }
    }

    let result = '';
    for (let i = words.length - 1; i >= 0; i--)
        result += (' ' + words[i]);

    return result.trim();
}

