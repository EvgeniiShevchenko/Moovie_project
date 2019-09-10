import * as mongoose from 'mongoose';

export const MoovieSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true
    },
    OriginalName: {
      type: String,
    },
    Genre: {
      type: Array,
      required: true
    },
    Images: {
      type: String,
      required: true
    },
    Year: {
      type: Number,
      required: true
    },
    TypeOf: {
      type: String,
      required: true
    },
    Updated: {
      type: Date,
      default: Date.now
    },
    Status: {
      type: String,
      required: true
    },
    NumOfSeries: {
      type: Number,
      default: 0
    },
    Rating: {
      type: Number,
    },
    Studio: {
      type: String,
      required: true
    },
    StudioLogo: {
      type: String,
    },
    Duration: {
      type: Number,
    },
    Translation: {
      type: String,
    },
    AgeRating: {
      type: String,
      required: true
    },
    Country: {
      type: String,
    },
    Voted: {
      type: Number,
      default: 0
    },
    Looked: {
      type: Number,
      default: 0
    },
    Commented: {
      type: Number,
      default: 0
    },
    Description: {
      type: String,
      required: true
    },
  },
  { collection: 'moovis' },
);

