import mongoose, { Schema, Types } from "mongoose";

export interface IScore extends Document {
    year: number;
    quarter: number;
    nfc: number;
    afc: number;
    event: Types.ObjectId;
}

const scoreSchema = new Schema<IScore>({
    year: { type: Number },
    quarter: { type: Number },
    nfc: { type: Number },
    afc: { type: Number },
    event: { type: Schema.Types.ObjectId, ref: 'FootballEvent' }
},{
    collection: 'scores'
});

const Score = mongoose.models.Score || mongoose.model<IScore>('Score', scoreSchema );
export default Score;