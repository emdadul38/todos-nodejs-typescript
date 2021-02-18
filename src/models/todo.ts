import {ITodo} from "../types/todo";
import { model, Schema} from "mongoose";

const todoSchema: Schema = new Schema({
	user: {type: String, required: true},
	text: {type: String, required: true},
	priority: {type: String, default: 'low', enum: ['low', 'moderate', 'high']},
	created: { type: Date, default: Date.now }
});

export default model<ITodo>("Todo", todoSchema);