import type { IFootballEvent } from "@models/events";

const ROWS = 'ABCDEFGHIJ'.split('');
const QUARTERS = [1,2,3,4];

export function getWinners( footballEvent:IFootballEvent ): Array<string>
{
    let winners = [ null, null, null, null ];
    for( let q of QUARTERS ){
        let nfcScore = footballEvent.nfc.scores[q-1];
        let afcScore = footballEvent.afc.scores[q-1];
        if( nfcScore === null || afcScore === null ){
            continue;
        }
        let lastNfcDigit = nfcScore !== null ? nfcScore % 10 : null;
        let lastAfcDigit = afcScore !== null ? afcScore % 10 : null;
        let row = ROWS[footballEvent.afc.sequences[q-1].indexOf( lastAfcDigit )];
        let col = footballEvent.nfc.sequences[q-1].indexOf( lastNfcDigit );
        winners[q-1] = `${row}${col}`;
    }
    return winners;
}