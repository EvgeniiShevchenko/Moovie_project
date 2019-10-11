import { Dispatch, SetStateAction } from 'react';

export interface ItemFace {
  Name: string;
  OriginalName: string;
  Slug: string;
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

export interface GenreFace {
  _id: any;
  Name: string;
  OriginalName: string;
  Images: string;
  Description: string;
}

export interface ValueFace {
  genre: string;
  type: string;
  status: string;
  sort: string;
  age: string;
  years: {
    fromYear: number | string;
    toYear: number | string;
  };
  countSeries: {
    from: number | string;
    to: number | string;
  };
}

export interface FilterFace {
  curentpage: number;
  skip: number;
  limit: number;
  itemName: string;
  filter: {
    status: boolean;
    Genre: string[];
    TypeOf: string;
    Status: string;
    Year: {
      from: number;
      to: number;
    };
    NumOfSeries: {
      from: number;
      to: number;
    };
    AgeRating: string;
  };
  search: {
    status: boolean;
    type: string;
    param: number;
  };
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
  values: ValueFace;
  setValues: Dispatch<SetStateAction<ValueFace>>;
}
