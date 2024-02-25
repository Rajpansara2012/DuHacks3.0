import { Schema, model, models } from 'mongoose';

const TempSchema = new Schema({
    name: {
        type: String,
    },
});

const Temp = models.User || model("Temp", TempSchema);

export default Temp;