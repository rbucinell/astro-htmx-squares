const ROWS = 'ABCDEFGHIJ'.split('');
const Qs = [1,2,3,4];

export function getWinners( scores, sequences ): Array<string>
{
    let winners = [ null, null, null, null ];

    for( let q of Qs )
    {
        let score = scores.find( s => s.quarter === q );
        if( !score ) continue;
        let afcDigit = score.afc % 10;
        let nfcDigit = score.nfc % 10;

        let row = ROWS[sequences.afc[`q${q}`].indexOf( afcDigit )];
        let col = sequences.nfc[`q${q}`].indexOf( nfcDigit );

        winners[q-1] = `${row}${col}`;
    }
    return winners;
}