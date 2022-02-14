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
        ['Jon', 'Nic'],
        ['Van', 'Mac'],
        ['Joe', 'Bob'],
        ['Kay', 'Pip']
    ],
    [
        ['Jon', 'Mac'],
        ['Joe', null]
    ],
    [
        ['Mac', null]
    ],
    [
        null
    ]
));

// Output:
/*
_Jon_                              
     \_Jon_                        
_Nic_/     \                       
            \_Mac_                 
_Van_       /     \                
     \_Mac_/       \               
_Mac_/              \              
                     \_____        
_Joe_                /             
     \_Joe_         /              
_Bob_/     \       /               
            \_____/                
_Kay_       /                      
     \_____/                       
_Pip_/                             
*/
```

## Usage
The arguments of the function are arrays, each representing a round of the tournament. Each of the round arrays contain arrays (unless the round represents the bracket winner), each representing a match. Each of the match arrays contain 0, 1, or 2 elements, each representing a player.

The function must have at least 1 argument (round). The length of each array must be equal to or half of the length of the previous argument.

If a contained array (match) has 0 elements, then the match is not drawn in the bracket. If it has 1 element, then that player is in the top seat of the match with the bottom seat empty. If it has 2 elements, then the first player is in the top seat of the match and the second player is in the bottom seat.

If either player is `null`, then the match is drawn in the bracket, but no player will be listed in the corresponding seat.