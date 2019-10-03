import React, { ReactNode } from 'react';
import { FilterFace } from "../interfaces";
import SearchContext from '../useContext/searchContext';

interface Props {
  children?: ReactNode
};

const LayoutContext: React.FunctionComponent<Props> = ({ children }: Props): JSX.Element => {
  const [filterParametr, setFilterParameter] = React.useState<FilterFace>({
    curentpage: 0,
    skip: 6,
    limit: 6,
    itemName: '',
    filter: {
      status: false,
      Genre: [],
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
  });
  const [values, setValues] = React.useState<{}>({
    genre: '',
    type: '',
    status: '',
    sort: '',
    age: '',
    years: {
      fromYear: null,
      toYear: null,
    },
    countSeries: {
      from: null,
      to: null,
    },
  });
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [curentPage, setCurentPage] = React.useState<number>(1);
  const [filterResetButtonHeandler, setFilterResetButtonHeandler] = React.useState<boolean>(false);

  const layoutContext = {
    filterParametr,
    setFilterParameter,
    curentPage,
    setCurentPage,
    searchValue,
    setSearchValue,
    filterResetButtonHeandler,
    setFilterResetButtonHeandler,
    values,
    setValues,
  };

  return (
    <>
      <SearchContext.Provider value={layoutContext}>{children}</SearchContext.Provider>
    </>
  );
};

export default LayoutContext;
