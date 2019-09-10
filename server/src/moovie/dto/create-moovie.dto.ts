export class CreateMoovieDto {
  readonly Name: string;
  readonly OriginalName: string;
  readonly Genre: Array<string>;
  readonly Images: string;
  readonly Year: number;
  readonly TypeOf: string;
  readonly Updated: Date;
  readonly Status: string;
  readonly NumOfSeries: number;
  readonly Rating: number;
  readonly Studio: string;
  readonly StudioLogo: string;
  readonly Duration: number;
  readonly Translation: string;
  readonly AgeRating: string;
  readonly Country: string;
  readonly Voted: number;
  readonly Looked: number;
  readonly Commented: number;
  readonly Description: string;
}
