import { createContext } from 'react';
import { Usecontextdata } from '../interfaces';

const SearchContext = createContext<Usecontextdata>({
  filterParametr: {
    curentpage: 0,
    skip: 6,
    limit: 6,
    itemName: '',
    filter: {
      status: false,
      Genre: [''],
      TypeOf: '',
      Status: '',
      Year: {
        from: 0,
        to: 0,
      },
      NumOfSeries: {
        from: 0,
        to: 0,
      },
      AgeRating: '',
    },
    search: {
      status: false,
      type: '_id',
      param: 1,
    },
  },
  setFilterParameter: object => {
    return object;
  },
  curentPage: 1,
  setCurentPage: number => number,
  filterResetButtonHeandler: false,
  setFilterResetButtonHeandler: boolean => boolean,
  searchValue: '',
  setSearchValue: string => string,
  values: {
    genre: '',
    type: '',
    status: '',
    sort: '',
    age: '',
    years: {
      fromYear: '0',
      toYear: '0',
    },
    countSeries: {
      from: '0',
      to: '0',
    },
  },
  setValues: object => object,
});

export default SearchContext;
