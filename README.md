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
The arguments of the function are arrays, each representing a round of the tournament. Each of the round arrays contain arrays, each representing a match. Each of the match arrays contain 0, 1, or 2 elements, each representing a player.

The function must have at least 1 argument (round). The length of each array must be equal to or half of the length of the previous argument.

If a contained array (match) has 0 elements, then the match is not drawn in the bracket. If it has 1 element, then that player is in the top seat of the match with the bottom seat empty. If it has 2 elements, then the first player is in the top seat of the match and the second player is in the bottom seat.

If either player is `null`, then the match is drawn in the bracket, but no player will be listed in the corresponding seat.
