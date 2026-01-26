import mongoose, { Schema, Types, Document } from "mongoose";

export interface ITeamData {
    name: string | null;
    sequences: (number | null)[][];
    scores: (number | null)[];
}

export interface ISquaresConfig {
    price: number;
    payouts: number[];
}

export interface IFootballEvent extends Document {
    _id: Types.ObjectId;
    name: string;
    season: number;
    squares: ISquaresConfig;
    kickoff: Date;
    nfc: ITeamData;
    afc: ITeamData;
}

const teamDataSchema = new Schema<ITeamData>({
    name: { type: String, default: null },
    sequences: { type: [[Number]], default: null },
    scores: { type: [Number], default: null }
}, { _id: false });

const squaresConfigSchema = new Schema<ISquaresConfig>({
    price: { type: Number },
    payouts: { type: [Number] }
}, { _id: false });

const eventSchema = new Schema<IFootballEvent>({
    name: { type: String },
    season: { type: Number },
    squares: { type: squaresConfigSchema },
    kickoff: { type: Schema.Types.Date },
    nfc: { type: teamDataSchema },
    afc: { type: teamDataSchema }
},{
    collection: 'events'
});

const FootballEvent = mongoose.models.FootballEvent || mongoose.model<IFootballEvent>('FootballEvent', eventSchema );
export default FootballEvent;