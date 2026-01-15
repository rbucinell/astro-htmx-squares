import type { APIContext } from "astro";
import connectDB from '../../../lib/mongodb';
import { successJSON, errorResponse, error404 } from '../../../lib/response';
import UserPick, { type IUserPick } from "../../../models/picks";

export async function GET(): Promise<Response> {
    await connectDB();

    const data:IUserPick[] = await UserPick.find();
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
                const response = await UserPick.create( single );
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
    const data:IUserPick = await UserPick.findOne().where('pick').equals( record.pick );
    return data !== null;
}