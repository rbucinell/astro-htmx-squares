import type { APIContext } from "astro";
import { successJSON, error404 } from '../../../lib/response';
import UserPick from "src/models/picks";
const collection = 'picks'

export async function GET({ params }: APIContext){
    const { pick, eventId } = params;
    let response = await UserPick.findOne().where('pick').equals( pick ).where('event').equals( eventId );
    return !response ? error404() : successJSON( response );
}

export async function PUT({ request, params, url }: APIContext){
    try{
        const { pick } = params;
        const eventId = url.searchParams.get('eventId');
        const paid = url.searchParams.get('paid');
        
        console.log('Pick:', pick);
        console.log('EventId:', eventId);
        
        // Check if pick and eventId exist
        if (!pick || !eventId) {
            return new Response('Missing pick or eventId', { status: 400 });
        }
        
        // First, check if the document exists
        const existing = await UserPick.findOne({ pick, event: eventId });
        console.log('Existing document:', existing);
        
        if (!existing) {
            return new Response('Document not found', { status: 404 });
        }
        
        let response = await UserPick.updateOne(
            { pick: pick, event: eventId }, 
            { "$set": { paid} }
        );
        
        console.log('PUT response:', response);
        
        if (response.matchedCount === 0 || response.modifiedCount === 0) {
            return new Response('No documents updated', { status: 404 });
        }
        
        return new Response(null, { status: 200 }); // Use 200, not 201 for updates
    }catch( err )
    {
        return new Response(err, { status: 500 });
    }
}

export async function DELETE({ params, url }: APIContext){
    const { pick } = params;
    const eventId = url.searchParams.get('eventId');
    let response = await UserPick.deleteOne({ pick, event: eventId  } );
    return response.deletedCount === 0 ? error404( JSON.stringify(response) ) : successJSON( );
}