import mongoose, { Schema, Types, Document } from "mongoose";

export interface IUserPick {
    display: string;
    email: string;
    pick: string;
    paid: boolean;
    submitted: Date;
}

const pickSchema = new Schema<IUserPick>({
    display: { type: String },
    email: { type: String },
    pick: { type: String },
    paid: { type: Boolean },
    submitted: { type: Schema.Types.Date },
},{
    collection: 'picks'
});

const UserPick = mongoose.models.UserPick || mongoose.model<IUserPick>('UserPick', pickSchema );
export default UserPick;