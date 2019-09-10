import { Document } from 'mongoose';

export interface Genre extends Document {
  readonly Name: string;
  readonly OriginalName: string;
  readonly Images: string;
  readonly Description: string;
}