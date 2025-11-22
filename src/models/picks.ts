import mongoose, { Schema, Types } from "mongoose";

export interface IPick {
    _id: Types.ObjectId;
    display: string;
    email: string;
    pick: string;
    paid: boolean;
    submitted: Date;
}

const pickSchema = new Schema<IPick>({
    display: { type: String },
    email: { type: String },
    pick: { type: String },
    paid: { type: Boolean },
    submitted: { type: Schema.Types.Date },
},{
    collection: 'picks'
});

const Pick = mongoose.models.Pick || mongoose.model<IPick>('Pick', pickSchema );
export default Pick;