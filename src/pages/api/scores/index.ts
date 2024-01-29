import type { APIContext } from "astro";
import {db} from "src/lib/mongodb";
import { successJSON, errorResponse, error404 } from '../../../lib/response';
const collection = 'scores'

export async function GET({ url, request }: APIContext){
    const year = url.searchParams.get('year') || (new Date().getFullYear());
    const response = await db('find', collection );
    //const response = await db('find', collection, { limit: 50, filter: {year} } );
    const data = await response.json();
    if( data.length === 0 ){
        return error404();
    }
    return successJSON( data );
}


export async function POST({ request }: APIContext){
    const body = await request.json();
    if( !body.year) return errorResponse(400,"Missing required parameter 'year'");
    if( !body.quarter) return errorResponse(400,"Missing required parameter 'quarter'");
    if( !body.nfc) return errorResponse(400,"Missing required parameter 'nfc'");
    if( !body.afc) return errorResponse(400,"Missing required parameter 'afc'");
    return new Response('TODO: '+JSON.stringify(body));
}