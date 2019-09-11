import * as mongoose from 'mongoose';

export const GenreSchema = new mongoose.Schema({
  Name: String,
  OriginalName: String,
  Images: String,
  Description: String,
}, {collection: 'genres'});
