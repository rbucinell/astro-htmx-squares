import type { APIContext } from "astro";
import connectDB from '@lib/mongodb';
import { successJSON, errorResponse, error404 } from '@lib/response';
import UserPick, { type IUserPick } from "@models/picks";
import FootballEvent, { type IFootballEvent } from "@models/events";
import { Types } from "mongoose";

export async function GET( { request, params, url }: APIContext): Promise<Response> {
    await connectDB();
    let eventId = undefined;
    if(url.searchParams.has('event')){
        eventId = url.searchParams.get('event');
    }else if( url.searchParams.has('season') ){
        let event:IFootballEvent = await FootballEvent.findOne({ season: parseInt( url.searchParams.get('season'))} as any );
        if( event ){
            eventId = event._id.toString();
        }else{
            return errorResponse(400, JSON.stringify({ "msg": "No event found for season"}) );
        }
    }
    if( !eventId){
        return errorResponse(400, JSON.stringify({ "msg": "FootballEvent or Season parameter required" }) );
    }
    const data:IUserPick[] = await UserPick.find({event: new Types.ObjectId(eventId)} as any );
    if( data.length === 0 ){
        return successJSON(data);
    }
    return successJSON( data );
}

export async function POST( {request}: APIContext ) {
    let content = await request.json();

    if( !content.email || !content.name || !content.picks || content.picks.length === 0){
        return errorResponse(400, null);
    }
    else{
        let submissions = [];
        for( let pick of content.picks){
            let { name, email, event } = content;
            let single = { display:name, email, pick, paid:false, submitted: new Date(), event: new Types.ObjectId(event) };

            if( !await recordExists( single ) ){
                const response = await UserPick.create( single );
                if( response.status === 201 ){
                    submissions.push({...single, success: true});
                }
                else{
                    submissions.push({...single, success: false, reason:'Error In Submission'});
                }
            }
            else{
                submissions.push({...single, success: false, reason:'Already Taken'});
            }
        }
        return successJSON(submissions);
    }
}

async function recordExists( record: any) {
    const data = await UserPick.exists({ pick: record.pick, event: record.event });
    return data !== null;
}