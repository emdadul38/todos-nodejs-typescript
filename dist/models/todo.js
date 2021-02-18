"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    priority: { type: String, default: 'low', enum: ['low', 'moderate', 'high'] },
    created: { type: Date, default: Date.now }
});
exports.default = mongoose_1.model("Todo", todoSchema);
