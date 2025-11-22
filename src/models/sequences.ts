import mongoose, { Schema, Types } from "mongoose";

export interface ISequence extends Document {
    _id: mongoose.Types.ObjectId;
    division: string;
    quarter: number;
    year: number;
    sequence: number[];
}

const pickSchema = new Schema<ISequence>({
    division: String,
    quarter: Number,
    year: Number,
    sequence: Array<Number>
},{
    collection: 'sequences'
});

const Sequence = mongoose.models.Sequence || mongoose.model<ISequence>('Sequence', pickSchema );
export default Sequence;