
import Sequence, { type ISequence } from 'src/models/sequences.ts';
import { successJSON } from '../../lib/response';
const collection = 'sequences';
const randomSeed = 'superbowl58_2025';
const kickoff = new Date('February 8, 2026 18:00:00');
import { GET as GetPicks } from '../api/picks/index.ts';

async function sequence( division:string, quarter:number, year:number = new Date().getFullYear() ): Promise<ISequence>
{
    let sequence:ISequence = await Sequence.findOne({ division, quarter } as any).lean();
    if(!sequence){
        const newSequence = await randomOrgSequence( division, quarter );
        sequence = await Sequence.create({ division, quarter, sequence: newSequence, year });
        return sequence;
    }
    return sequence;
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

    const pickTotal = (await (await GetPicks()).json() ).length;

    if( (new Date() > kickoff) || pickTotal === 100)
    {
        for( let q = 1; q <= 4; q++ )
        {
            sequences.afc[`q${q}`] = await sequence('afc', q);
            sequences.nfc[`q${q}`] = await sequence('nfc', q);
        }
    }
    return successJSON(sequences);
}
