import {database} from "src/lib/mongodb";

const demo = {    
    _id: "65a68fbe16f7e23c4412a16e",
    year:2024,
    quarter:1,
    nfc:3,
    afc:10
}


export async function GET() {
    const mongo = await database();
    const scores = mongo.collection('scores');
    
    await mongo.command({ping: 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    return new Response(
        JSON.stringify(demo), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}