import type { APIContext } from "astro";
import {db, find, findOne} from "src/lib/mongodb";
import { successJSON, error404 } from '../../../lib/response';
const collection = 'scores'

export async function GET({ params }: APIContext){
    let {year} = params;
    if (!year) {
        return error404();
    }

    try{
        const response = await db('find', collection, {filter:{year: parseInt(year)}});
        const data = await response.json();
        if( data.length === 0 ){
            return error404();
        }
        return successJSON( data );
    }
    catch( error ){
        console.error( 'Error:', error);
        return error404();
    }
}

