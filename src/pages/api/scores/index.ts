import {db, find, findOne} from "src/lib/mongodb";
const collection = 'scores'
const demo = {    
    _id: "65a68fbe16f7e23c4412a16e",
    year:2024,
    quarter:1,
    nfc:3,
    afc:10
}

export async function GET() {
    const response = await db('find', collection, { limit: 2} );
    const data = await response.json();
    console.log( data );
    return new Response( JSON.stringify(data) );
}
