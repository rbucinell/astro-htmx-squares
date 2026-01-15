import type { APIContext } from "astro";
import { successJSON, error404 } from '../../../lib/response';
import UserPick from "src/models/picks";
const collection = 'picks'

export async function GET({ params }: APIContext){
    const { id } = params;
    console.log( id );
    let response = await UserPick.findOne().where('pick').equals( id );
    console.log( response );
    return !response ? error404() : successJSON( response );
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

        let response = await UserPick.updateOne({ pick: id }, { "$set": {...content} });
        if( response.matchedCount === 0 || response.modifiedCount === 0 ) {
                return error404();
        }
        return new Response(null, { status: 201 });
    }catch( err )
    {
        return new Response(err, { status: 500 });
    }
}

export async function DELETE({ params }: APIContext){
    const { id } = params;
    let response = await UserPick.deleteOne({ pick: id });
    return response.deletedCount === 0 ? error404( JSON.stringify(response) ) : successJSON( );
}