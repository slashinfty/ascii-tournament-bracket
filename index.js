const generate = (...args) => {
    
    if (args.length === 0) {
        throw 'ascii-tournament-bracket expects at least one argument';
    }
    args.forEach((arg, i) => {
        if (Array.isArray(arg) === false) {
            throw `ascii-tournament-bracket expects each argument to be an array`;
        }
        if (arg.length === 0) {
            throw  `ascii-tournament-bracket expects each argument to contain at least one element`;
        }
        if (i !== 0) {
            if (Array.isArray(arg) && arg.length !== args[i - 1].length && arg.length !== 0.5 * args[i - 1].length) {
                throw `ascii-tournament-bracket expects each argument to either be the same length or half the length of the previous argument`;
            }
        }
        arg.forEach((arr, index) => {
            if (index === arg.length - 1) {
                if (typeof arr === 'string' || arr === null) {
                    if (args[i - 1].length !== 1) {
                        throw `ascii-tournament-bracket expects an array of length 1 preceding an argument containing a single string or null`;
                    }
                } else if (Array.isArray(arr) === true) {
                    if (arr.length > 2) {
                        throw `ascii-tournament-bracket expects each array inside an argument to have a maximum of 2 elements`;
                    }
                    arr.forEach(el => {
                        if (typeof el !== 'string' && el !== null) {
                            throw `ascii-tournament-bracket expects each array inside an argument to contain only strings or null`;
                        }
                    });
                } else {
                    throw `ascii-tournament-bracket expects an array, string, or null as the last argument`;
                }
            } else {
                if (arr.length > 2) {
                    throw `ascii-tournament-bracket expects each array inside an argument to have a maximum of 2 elements`;
                }
                arr.forEach(el => {
                    if (typeof el !== 'string' && el !== null) {
                        throw `ascii-tournament-bracket expects each array inside an argument to contain only strings or null`;
                    }
                });
            }
        });
    });

    let array = new Array();
    let exponentCounter = 0;
    const exponents = args.map((arg, index, arr) => {
        if (index !== 0 && (arr[index - 1].length !== arg.length || Array.isArray(arg[0]) === false)) {
            exponentCounter++;
        }
        return exponentCounter;
    });
    let duplicateCounter = 0;
    const duplicateCount = args.map((arg, index, arr) => {
        if (index !== 0 && arr[index - 1].length === arg.length) {
            duplicateCounter++;
        }
        return duplicateCounter;
    });
    const maxNameLengthArray = args.map(arg => {
        return Math.max(5, arg.reduce((max, arr) => Array.isArray(arr) === true ? Math.max(max, arr.reduce((m, c) => c === null ? 0 : Math.max(m, c.length), 0)) : 0, 0) + 2)
    });
    const rowLength = maxNameLengthArray.reduce((sum, value) => sum + value, 0) + Array(args.length).fill(null).reduce((sum, value, index) => sum + (2 ** index), 0);
    const rowCount = (2 ** args[0].length) + duplicateCounter;
    for (let i = 0; i < rowCount; i++) {
        array[i] = [...Array(rowLength).fill(` `)];
    }

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        let row = i === 0 ? 0 : (2 ** exponents[i]) - 1 + duplicateCount[i];
        let column = 0;
        for (let j = 0; j < i; j++) {
            column += maxNameLengthArray[j] + (2 ** exponents[j]);
        }
        let startingColumn = column;
        for (let j = 0; j < arg.length; j++) {
            const match = arg[j];
            if (match === null) {
                row--;
                for (let l = 0; l < maxNameLengthArray[i]; l++) {
                    array[row][column] = `_`;
                    if (l < maxNameLengthArray[i] - 1) {
                        column++;
                    }
                }
                continue;
            }
            if (typeof match === 'string') {
                array[row][column] = `_`;
                const playerArray = match.split('');
                for (let l = 0; l < playerArray.length; l++) {
                    column++;
                    array[row][column] = playerArray[l];
                }
                for (let l = 0; l < maxNameLengthArray[i] - playerArray.length - 1; l++) {
                    column++;
                    array[row][column] = `_`;
                }
            }
            if (match.length === 0) {
                row += 2 * (2 ** exponents[i] + 1);
                continue;
            }
            if (match.length === 1) {
                match.push(null);
            }
            for (let k = 0; k < match.length; k++) {
                column = startingColumn;
                if (match[k] === null) {
                    for (let l = 0; l < maxNameLengthArray[i]; l++) {
                        array[row][column] = `_`;
                        if (l < maxNameLengthArray[i] - 1) {
                            column++;
                        }
                    }
                    if (k === 1) {
                        column++;
                    }
                } else {
                    array[row][column] = `_`;
                    const playerArray = match[k].split('');
                    for (let l = 0; l < playerArray.length; l++) {
                        column++;
                        array[row][column] = playerArray[l];
                    }
                    for (let l = 0; l < maxNameLengthArray[i] - playerArray.length - 1; l++) {
                        column++;
                        array[row][column] = `_`;
                    }
                }
                if (k === 0) {
                    for (let l = 0; l < 2 * (2 ** exponents[i]); l++) {
                        if (l < 2 ** exponents[i]) {
                            row++;
                            column++;
                            array[row][column] = `\\`;
                        }
                        else {
                            if (l !== 2 ** exponents[i]) {
                                column--;
                            }
                            row++;
                            array[row][column] = `/`;
                        }
                    }
                }
                if (k === 1) {
                    row += 2 ** (exponents[i] + 1);
                }
            }
        }
    }
    
    return array.map(arr => arr.join(``)).join(`\n`);
}

export default generate;