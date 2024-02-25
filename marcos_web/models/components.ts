import { Schema, model, models } from 'mongoose';

const componetsSchema = new Schema({
    html: {
        type: String,
    },
    css: {
        type: String,
    },
    js: {
        type: String,
    },
    category: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Components = models.Components || model("Components", componetsSchema);

export default Components;