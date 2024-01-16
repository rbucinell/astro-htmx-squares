import { MongoClient } from 'mongodb';

if (!import.meta.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}

const uri = import.meta.env.MONGODB_URI;
const options = {};
let cache;

const connect = async () =>{
    const mongo = await new MongoClient(uri, options).connect();
    return mongo.db('squares');
}

export const database = async () => {
    if( import.meta.env.NODE_ENV === 'development' ){
        if( !global._mongoConnection) {
            global._mongoConnection = await connect();
            cache = global._mongoConnection;
        }
        return cache;
    }
    return await connect();
}