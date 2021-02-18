import { Document } from "mongoose";

export interface ITodo extends Document {
	user: string;
	text: string;
	priority: boolean;
}
