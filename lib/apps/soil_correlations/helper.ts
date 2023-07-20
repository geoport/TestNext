export function calcMean(values: string[]): string {
    let sum = 0;
    for (const val of values) {
        const fl = parseFloat(val);
        if (fl >= 0) {
            sum += fl;
        }
    }
    return `${(sum / values.length).toFixed(3)}`;
}

export function calcMin(values: string[]): string {
    let min = parseFloat(values[0]);
    for (const val of values) {
        const fl = parseFloat(val);
        if (fl < min && fl >= 0) {
            min = parseFloat(val);
        }
    }
    return `${min.toFixed(3)}`;
}

export function getResult(values: string[], selectedValue: string): string {
    if (selectedValue === 'minimum') {
        return calcMin(values);
    } else {
        return calcMean(values);
    }
}
