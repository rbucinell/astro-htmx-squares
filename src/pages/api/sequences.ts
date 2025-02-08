import {db} from "src/lib/mongodb";
import { successJSON } from '../../lib/response';
const collection = 'sequences';
const randomSeed = 'superbowl58_2025';
const kickoff = new Date('February 11, 2025 10:00:00');

async function sequence( division, quarter )
{
    const response = await db('findOne', collection, {filter:{ division, quarter}} ); 
    const data = await response.json();
    if( !data.document ){
        let sequence = await randomOrgSequence( division, quarter );
        await db('insertOne', collection, {
            document: { division, quarter, sequence }
        } );
        return sequence;
    }else{
        return data.document.sequence;
    }    
}

async function randomOrgSequence( division:string, quater:number ): Promise<Array<number>> {
    let key = `${randomSeed}-${division}q${quater}`;
    let response = await fetch(`https://www.random.org/sequences/?min=0&max=9&col=10&format=plain&rnd=id.${key}`);
    let data = await response.text();
    return data.trim().split('\t').map( _ => parseInt(_));
}

export async function GET() {

    let sequences = {
        afc: { 
            q1: ['#','#','#','#','#','#','#','#','#','#'], 
            q2: ['#','#','#','#','#','#','#','#','#','#'], 
            q3: ['#','#','#','#','#','#','#','#','#','#'], 
            q4: ['#','#','#','#','#','#','#','#','#','#'] },
        nfc: { 
            q1: ['#','#','#','#','#','#','#','#','#','#'], 
            q2: ['#','#','#','#','#','#','#','#','#','#'], 
            q3: ['#','#','#','#','#','#','#','#','#','#'], 
            q4: ['#','#','#','#','#','#','#','#','#','#'] }
    };

    if( new Date() > kickoff)
    {
        for( let q = 1; q <= 4; q++ )
        {
            sequences.afc[`q${q}`] = await sequence('afc', q);
            sequences.nfc[`q${q}`] = await sequence('nfc', q);
        }
    }
    return successJSON(sequences);
}