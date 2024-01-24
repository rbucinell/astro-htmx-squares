import type { APIContext } from "astro";
import {db} from "src/lib/mongodb";
import { successJSON, error404 } from '../../../lib/response';
const collection = 'picks'

export async function GET({ url, request }: APIContext){
    const response = await db('find', collection );
    const data = await response.json();
    if( data.length === 0 ){
        return error404();
    }
    return successJSON( data );
}