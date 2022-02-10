# ascii-tournament-bracket
Generates an ASCII representation of an elimination tournament bracket.

## Install
```bash
npm i ascii-tournament-bracket
```

## Example
```js
// Must use import (pure ESM)
import asciiBracket from 'ascii-tournament-bracket';

console.log(asciiBracket(
    [
        [],
        [],
        [],
        []
    ],
    [
        [],
        []
    ],
    [
        []
    ]
));

// Output:
/*

*/
```

## Usage
The function may have any number (greater than 0) of arguments.

Argument type: `[string|null?, string|null?][]`

Each argument is an array (representing a single round) consisting of arrays (representing the individual matches). Each of the contained arrays (matches) can have 0, 1, or 2 elements (players).

* If there are zero elements, the match does not exist in the bracket.
* If there is one element, the element is in the top seat of the match, and the bottom seat is empty.
* If there are two elements, the first element is in the top seat of the match, and the second element is in the bottom seat of the match.

If either element is `null`, then the match is drawn, but the corresponding seat(s) is/are empty.