import type { APIContext } from "astro";
import connectDB from '@lib/mongodb';
import { successJSON, errorResponse, error404 } from '@lib/response';
import FootballEvent, { type IFootballEvent } from "@models/events";

export async function GET(): Promise<Response> {
    await connectDB();

    const data:IFootballEvent[] = await FootballEvent.find().sort({ season: -1 });
    if( data.length === 0 ){
        return error404();
    }
    return successJSON( data );
}