import type { APIContext } from "astro";
import {db} from "src/lib/mongodb";
import { successJSON, error404 } from '../../../lib/response';
const collection = 'picks'

export async function GET({ params }: APIContext){
    const { id } = params;
    let response = await db('findOne', collection, {filter:{ pick: id }});
    let data = await response.json();
    return !data.document ? error404() : successJSON( data.document );
}

export async function PUT({ request, params, url }: APIContext){
    try{
        const { id } = params;
        let content = {};

        //take query parameters first, but override with body content
        url.searchParams?.forEach( (v,k) => content[k] = v);
        // if( request.headers.get("Content-Length") !== '0'){
        //     let json = await request.json();
        //     for(let key in json){

        //         let val = json[key];
        //         if( key === 'paid')
        //             val = val === 'true';
        //         content[key] = val
        //     }
        // }

        let response = await db('updateOne', collection, {filter:{ pick: id }, update:{ "$set": {...content} }});
        let data = await response.json();
        if( response.status.toString().startsWith('2') ){            
            if( data.matchedCount === 0 || data.modifiedCount === 0 ) 
                return error404();
            return new Response(null, { status: 201 });
        }else{
            return new Response(data, { status: response.status});
        }
    }
    catch( err )
    {
        return new Response(err, { status: 500 });
    }
}

export async function DELETE({ params }: APIContext){
    const { id } = params;
    let response = await db('deleteOne', collection, {filter:{ pick: id }});
    let data = await response.json();
    return data.deletedCount === 0 ? error404( JSON.stringify(data) ) : successJSON( );
}