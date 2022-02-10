const generate = (...args) => {
    if (args.length === 0) {
        throw 'ascii-tournament-bracket expects at least one argument';
    }
    args.forEach(arg => {
        if (Array.isArray(arg) === false) {
            throw `ascii-tournament-bracket expects type [string|null?, string|null?][] as an argument`;
        }
        arg.forEach(arr => {
            if (arr.length > 2) {
                throw `ascii-tournament-bracket expects type [string|null?, string|null?][] as an argument`;
            }
            arr.forEach(el => {
                if (typeof el !== 'string' && el !== null) {
                    throw `ascii-tournament-bracket expects type [string|null?, string|null?][] as an argument`;
                }
            });
        });
    });

    // TODO
}

export default generate;