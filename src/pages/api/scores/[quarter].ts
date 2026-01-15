import type { APIContext } from "astro";
import { successJSON, error404 } from '../../../lib/response';
import Score, { type IScore } from "src/models/scores";

export async function GET({ params }: APIContext){
    let {quarter} = params;
    let q = parseInt(quarter);
    if (!quarter || q < 1 || q > 4) {
        return error404();
    }

    try{
        const data = await Score.findOne({ quarter: q }).lean();
        if( !data ){
            return error404();
        }
        return successJSON( data );
    }
    catch( error ){
        console.error( 'Error:', error);
        return error404();
    }
}

export async function PUT({request, params, url}: APIContext) {
    let { quarter } = params;
    let q = parseInt(quarter);
    const data = await request.formData();
    const afc = parseInt(data.get('afc').toString());
    const nfc = parseInt(data.get('nfc').toString());

    const find = await db('findOne', collection, {filter:{quarter:q}});
    const findData = await find.json();
    if( findData.document)
    {
        await db('updateOne', collection, {
            filter:{ quarter:q }, 
            update:{ "$set": {afc,nfc} }
        });
    }else
    {
        await db('insertOne', collection, {
            document: { quarter: q, nfc, afc }
        } )
    }
    
    
    return successJSON(null,200);
}

