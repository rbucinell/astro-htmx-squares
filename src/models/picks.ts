import mongoose, { Schema, Types, Document } from "mongoose";

export interface IUserPick {
    display: string;
    email: string;
    pick: string;
    paid: boolean;
    submitted: Date;
    event: Types.ObjectId;
}

const pickSchema = new Schema<IUserPick>({
    display: { type: String },
    email: { type: String },
    pick: { type: String },
    paid: { type: Boolean },
    submitted: { type: Schema.Types.Date },
    event: { type: Schema.Types.ObjectId, ref: 'FootballEvent' }
},{
    collection: 'picks'
});

const UserPick = mongoose.models.UserPick || mongoose.model<IUserPick>('UserPick', pickSchema );
export default UserPick;