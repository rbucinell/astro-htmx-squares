import type { APIContext } from "astro";
import {db} from "src/lib/mongodb";
import { successJSON, error404 } from '../../../lib/response';
const collection = 'scores'

export async function GET({ params }: APIContext){
    let {quarter} = params;
    let q = parseInt(quarter);
    if (!quarter || q < 1 || q > 4) {
        return error404();
    }

    try{
        const response = await db('findOne', collection, {filter:{quarter:q}});
        const data = await response.json();
        if( !data.document ){
            return error404();
        }
        return successJSON( data.document );
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

