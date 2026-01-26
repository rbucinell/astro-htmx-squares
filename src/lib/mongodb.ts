import mongoose from "mongoose";
import 'dotenv/config';

export default async function connectDB() {
    try{
        if( mongoose.connection.readyState === 0){
            console.log(`Initializing connection to ${process.env.MONGODB_URI}`);
            await mongoose.connect(process.env.MONGODB_URI as string);
        }
    }catch( err ){
        console.error( err );
    }
}