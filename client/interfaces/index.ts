import { Dispatch, SetStateAction } from 'react';

export interface ItemFace {
  Name: string;
  OriginalName: string;
  Genre: Array<string>;
  Images: string;
  Year: number;
  TypeOf: string;
  Updated: Date;
  Status: string;
  NumOfSeries: number;
  Rating: number;
  Studio: string;
  StudioLogo: string;
  Duration: number;
  Translation: string;
  AgeRating: string;
  Country: string;
  Voted: number;
  Looked: number;
  Commented: number;
  Description: string;
  _id: any;
}

export interface FilterFace {
  curentpage: number;
  skip: number;
  limit: number;
  itemName: string;
  filter: {};
  search: {};
}

export interface Usecontextdata {
  filterParametr: FilterFace;
  setFilterParameter: Dispatch<SetStateAction<FilterFace>>;
  curentPage: number;
  setCurentPage: Dispatch<SetStateAction<number>>;
  filterResetButtonHeandler: boolean;
  setFilterResetButtonHeandler: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  values: Object;
  setValues: Dispatch<SetStateAction<Object>>;
}
