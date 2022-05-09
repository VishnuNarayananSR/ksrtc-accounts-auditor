import { Schema, model, models } from "mongoose";

const collectionSchema = new Schema({
  date: {
    type: Date,
    default: () => Date.now(),
    required: true,
    get: (date) => date.toLocaleDateString(),
  },
  totalCollection: {
    type: Number,
    required: true,
  },
  passengers: {
    type: Number,
    required: true,
  },
  diesel: {
    type: Number,
    required: true,
  },
  optedKM: {
    type: Number,
    required: true,
  },
  busRemitted: {
    type: Number,
    required: true,
  },
  dieselPrice: {
    type: Number,
    required: true,
  },
});
export default models.Collection || model("Collection", collectionSchema);
