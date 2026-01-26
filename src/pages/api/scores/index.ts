import type { APIContext } from "astro";
import connectDB from "src/lib/mongodb";
import { successJSON, errorResponse, error404 } from '../../../lib/response';
import mongoose from "mongoose";
import Score, { type IScore } from "src/models/scores";
const collection = 'scores'

export async function GET({ url, request }: APIContext){
    await connectDB();
    const year = url.searchParams.get('year') || (new Date().getFullYear());

    const response:IScore[] = await Score.find().lean();
    if( response.length === 0 ){
        return error404();
    }
    return successJSON( response );
}


export async function POST({ request }: APIContext){
    const body = await request.json();
    if( !body.year) return errorResponse(400,"Missing required parameter 'year'");
    if( !body.quarter) return errorResponse(400,"Missing required parameter 'quarter'");
    if( !body.nfc) return errorResponse(400,"Missing required parameter 'nfc'");
    if( !body.afc) return errorResponse(400,"Missing required parameter 'afc'");
    return new Response('TODO: '+JSON.stringify(body));
}