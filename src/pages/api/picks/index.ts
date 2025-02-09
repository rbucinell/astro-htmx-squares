import type { APIContext } from "astro";
import {db} from "src/lib/mongodb";
import { successJSON, errorResponse, error404 } from '../../../lib/response';
const collection = 'picks'

export async function GET(){
    const response = await db('find', collection );
    const data = await response.json();
    if( data.length === 0 ){
        return error404();
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
            let { name, email } = content;
            let single = { display:name, email, pick, paid:false, submitted: new Date()};

            if( !await recordExists( single ) ){
                let response = await db('insertOne', collection, {
                    document: single
                } );
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
    let response = await db('findOne', collection, {filter:{ pick: record.pick }});
    let data = await response.json();
    let document = data.document;
    return document !== null;
}