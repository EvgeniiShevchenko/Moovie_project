import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import root from 'window-or-global';
import _ from 'lodash';

// import { Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import SearchContext from '../../../useContext/searchContext';

// Import scss
import './filter.scss';

// Import interfaces
import { GenreFace } from '../../../interfaces';

// Import dynamic
const Grid = dynamic(() => import('@material-ui/core/Grid'));

interface Props {
  genres: GenreFace[];
}

const Filter: FunctionComponent<Props> = ({ genres }): JSX.Element => {
  // useContext
  const {
    filterParametr,
    setFilterParameter,
    curentPage,
    setCurentPage,
    filterResetButtonHeandler,
    setFilterResetButtonHeandler,
    searchValue,
    setSearchValue,
    values,
    setValues,
  } = React.useContext(SearchContext);
  // useState
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [genre, setGenre] = React.useState(genres);

  const inputLabel = React.useRef(null);

  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // setFilterParameter(loading)

  // }, [filterTru]);

  const searchAction = async () => {
    const { genre } = values;
    const filterPervState = {
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
    };
    const searchPervState = {
      status: false,
      type: '',
      param: 1,
    };
    const searchSetings = {
      curentpage: curentPage - 1,
      skip: 6,
      limit: 6,
      itemName: searchValue,
      filter: {
        status: false,
        Genre: genre.length !== 0 ? [genre.trim()] : [''],
        TypeOf: values.type,
        Status: values.status,
        Year: {
          from:
            // @ts-ignore
            values.years.fromYear === 'От' ? 0 : values.years.fromYear === '' ? 0 : parseInt(values.years.fromYear, 10),
          // @ts-ignore
          to: values.years.toYear === 'До' ? 0 : values.years.toYear === '' ? 0 : parseInt(values.years.toYear, 10),
        },
        NumOfSeries: {
          from:
            values.countSeries.from === 'От'
              ? 0
              : values.countSeries.from === ''
                ? 0
                :
                // @ts-ignore
                parseInt(values.countSeries.from, 10),
          to:
            // @ts-ignore
            values.countSeries.to === 'До' ? 0 : values.countSeries.to === '' ? 0 : parseInt(values.countSeries.to, 10),
        },
        AgeRating: values.age,
      },
      search: {
        status: false,
        type: values.sort,
        param: 1,
      },
    };
    if (_.isEqual(searchSetings.filter, filterPervState) && _.isEqual(searchSetings.search, searchPervState)) {
      setFilterParameter({
        ...searchSetings,
        filter: { ...searchSetings.filter, status: false },
        search: { ...searchSetings.search, status: false },
      });
    } else if (_.isEqual(searchSetings.filter, filterPervState) && !_.isEqual(searchSetings.search, searchPervState)) {
      setFilterParameter({
        ...searchSetings,
        filter: { ...searchSetings.filter, status: false },
        search: { ...searchSetings.search, status: true },
      });
    } else if (
      !_.isEqual(searchSetings.filter, filterPervState) &&
      _.isEqual(searchSetings.search, searchPervState)
    ) {
      setFilterParameter({
        ...searchSetings,
        filter: { ...searchSetings.filter, status: true },
        search: { ...searchSetings.search, status: false },
      });
    } else {
      setFilterParameter({
        ...searchSetings,
        filter: { ...searchSetings.filter, status: true },
        search: { ...searchSetings.search, status: true },
      });
    }
  };
  // {Genre: {$in: ["Комедия"]}, "TypeOf": "Сериал", "Year": {$gte: 2007, $lte: 2019},
  //  "NumOfSeries": {$gt: 12, $lte: 27}, "AgeRating": /PG-13/}

  const handleChange = (name: string | undefined, value: unknown): void => {
    setValues({ ...values, [name]: value });
    if (name === 'from' || name === 'to') {
      setValues({ ...values, countSeries: { ...values.countSeries, [name]: value } });
    }
    if (name === 'fromYear' || name === 'toYear') {
      setValues({ ...values, years: { ...values.years, [name]: value } });
    }
  };

  const filterReset = (): void => {
    setValues({
      genre: '',
      type: '',
      status: '',
      sort: '',
      age: '',
      years: {
        fromYear: 'От',
        toYear: 'До',
      },
      countSeries: {
        from: 'От',
        to: 'До',
      },
    });
    setFilterResetButtonHeandler(!filterResetButtonHeandler);
    setSearchValue('');
    setFilterParameter({
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
    });
  };

  const listGenres =
    genre.length !== 0 ? (
      _.map(genre, (genre, index) => {
        return (
          <MenuItem key={index} value={genre.Name}>
            {genre.Name}
          </MenuItem>
        );
      })
    ) : (
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
      );

  if (root.window) {
    return (
      <>
        <div className='filterWraper'>
          <Grid item container xs={12} spacing={0} style={{ backgroundImage: 'url(/static/images/filter-body.png)' }}>
            <Grid item xs={10}>
              {/* <input style = {{width: "36px"}} type="image" src="/static/images/deployWindow.png" alt="deploy window"/> */}
            </Grid>
            <Grid item xs={2}>
              {/* <a href = "/filter" > <img style = {{width: "26px", marginLeft: "40%", boxShadow: " -2px 2px 3px rgba(0,0,0,0.30)", opacity: "0.85"}} src="/static/images/newdeployWindow.png" alt=""/></a> */}
              <Link href='/filter'>
                <a>
                  {' '}
                  <img
                    style={{
                      width: '26px',
                      marginLeft: '40%',
                      boxShadow: ' -2px 2px 3px rgba(0,0,0,0.30)',
                      opacity: 0.85,
                    }}
                    src='/static/images/newdeployWindow.png'
                    alt=''
                  />
                </a>
              </Link>
              {/* <input onClick = "window.open('http://localhost:3000/filter')" style = {{width: "26px", marginLeft: "40%", boxShadow: " -2px 2px 3px rgba(0,0,0,0.30)", opacity: "0.85"}} type="image" src="/static/images/newdeployWindow.png" alt="deploy window"/> */}
            </Grid>
            <Grid style={{ margin: '40px 5px 0 5px', backgroundColor: 'white', borderRadius: '8px' }} item xs={12}>
              <FormControl variant='outlined' style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap' }}>
                  <InputLabel
                    style={{ transform: 'translate(0, 13px) scale(1)', left: 'auto' }}
                    ref={inputLabel}
                    htmlFor='outlined-age-simple'
                  >
                    {values.genre.length !== 0 ? values.genre : 'По жанру'}
                  </InputLabel>
                </div>
                <Select
                  style={{ height: '40px' }}
                  value=''
                  onChange={event => handleChange(event.target.name, event.target.value)}
                  input={<OutlinedInput labelWidth={labelWidth} name='genre' id='outlined-age-simple' />}
                >
                  <MenuItem value=''>
                    <em>Пусто</em>
                  </MenuItem>
                  {listGenres}
                </Select>
              </FormControl>
            </Grid>
            <Grid style={{ margin: '20px 5px 0 5px', backgroundColor: 'white', borderRadius: '8px' }} item xs={12}>
              <FormControl variant='outlined' style={{ width: '100%' }}>
                <InputLabel
                  style={{ transform: 'translate(95px, 12px) scale(1)' }}
                  ref={inputLabel}
                  htmlFor='outlined-age-simple'
                >
                  {values.type.length !== 0 ? values.type : 'По типу'}
                </InputLabel>
                <Select
                  style={{ height: '40px' }}
                  value=''
                  onChange={event => handleChange(event.target.name, event.target.value)}
                  input={<OutlinedInput labelWidth={labelWidth} name='type' id='outlined-age-simple' />}
                >
                  <MenuItem value=''>
                    <em>Пусто</em>
                  </MenuItem>
                  <MenuItem value='Фильм'>Фильм</MenuItem>
                  <MenuItem value='Сериал'>Сериал</MenuItem>
                  <MenuItem value='OVA'>OVA</MenuItem>
                  <MenuItem value='Special'>Special</MenuItem>
                  <MenuItem value='ONA'>ONA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid style={{ margin: '20px 5px 0 5px', backgroundColor: 'white', borderRadius: '8px' }} item xs={12}>
              <FormControl variant='outlined' style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <InputLabel
                    style={{ transform: 'translate(0, 13px) scale(1)', left: 'auto' }}
                    ref={inputLabel}
                    htmlFor='outlined-age-simple'
                  >
                    {values.status.length !== 0 ? values.status : 'По статусу'}
                  </InputLabel>
                </div>
                <Select
                  style={{ height: '40px' }}
                  value=''
                  onChange={event => handleChange(event.target.name, event.target.value)}
                  input={<OutlinedInput labelWidth={labelWidth} name='status' id='outlined-age-simple' />}
                >
                  <MenuItem value=''>
                    <em>Пусто</em>
                  </MenuItem>
                  <MenuItem value='Вышел'>Вышел</MenuItem>
                  <MenuItem value='Онгоинг'>Онгоинг</MenuItem>
                  <MenuItem value='Анонс'>Анонс</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5} style={{ margin: '15px 33px 0 5px', borderRadius: '8px' }}>
              <TextField
                id='standard-name'
                placeholder='От'
                value={
                  values.years.fromYear === '0' ? 'От' : values.years.fromYear === null ? 'От' : values.years.fromYear
                }
                name='fromYear'
                margin='dense'
                variant='outlined'
                onChange={event => handleChange(event.target.name, event.target.value)}
                style={{ width: '114%', backgroundColor: 'white', margin: '0 0 0 0', borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={5} style={{ margin: '15px 0 0 0', borderRadius: '8px' }}>
              <TextField
                id='standard-name'
                placeholder='До'
                margin='dense'
                value={values.years.toYear === '0' ? 'До' : values.years.toYear === null ? 'До' : values.years.toYear}
                name='toYear'
                variant='outlined'
                onChange={event => handleChange(event.target.name, event.target.value)}
                style={{ width: '113%', backgroundColor: 'white', margin: '0 0 0 -13%', borderRadius: '8px' }}
              />
            </Grid>
            {/*  */}
            <Grid item xs={5} style={{ margin: '20px 33px 0 5px', borderRadius: '8px' }}>
              <TextField
                id='standard-name'
                placeholder='От'
                value={
                  values.countSeries.from === '0'
                    ? 'От'
                    : values.countSeries.from === null
                      ? 'От'
                      : values.countSeries.from
                }
                onChange={event => handleChange(event.target.name, event.target.value)}
                margin='dense'
                variant='outlined'
                name='from'
                style={{ width: '114%', backgroundColor: 'white', margin: '0 0 0 0', borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={5} style={{ margin: '20px 0 0 0', borderRadius: '8px' }}>
              <TextField
                id='standard-name'
                placeholder='До'
                margin='dense'
                onChange={event => handleChange(event.target.name, event.target.value)}
                variant='outlined'
                value={
                  values.countSeries.to === '0' ? 'До' : values.countSeries.to === null ? 'До' : values.countSeries.to
                }
                name='to'
                style={{ width: '113%', backgroundColor: 'white', margin: '0 0 0 -13%', borderRadius: '8px' }}
              />
            </Grid>
            <Grid
              style={{ margin: '18px 5px 0 5px', backgroundColor: 'white', borderRadius: '8px', zIndex: 0 }}
              item
              xs={12}
            >
              <FormControl variant='outlined' style={{ width: '100%', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap' }}>
                  <InputLabel
                    style={{ transform: 'translate(0, 13px) scale(1)', left: 'auto' }}
                    ref={inputLabel}
                    htmlFor='outlined-age-simple'
                  >
                    {values.age.length !== 0 ? values.age : 'По возврасту'}
                  </InputLabel>
                </div>
                <Select
                  style={{ height: '40px' }}
                  value=''
                  onChange={event => handleChange(event.target.name, event.target.value)}
                  input={<OutlinedInput labelWidth={labelWidth} name='age' id='outlined-age-simple' />}
                >
                  <MenuItem value=''>
                    <em>Пусто</em>
                  </MenuItem>
                  <MenuItem value='PG(для детей)'>PG(для детей)</MenuItem>
                  <MenuItem value='G(для всех возврастов)'>G(для всех возврастов)</MenuItem>
                  <MenuItem value='PG-13 (от 13 лет)'>PG-13 (от 13 лет)</MenuItem>
                  <MenuItem value='R-17+ (насилие и/или нецензурная лексика)'>
                    R-17+ (насилие и/или нецензурная лексика)
                  </MenuItem>
                  <MenuItem value='R+ (есть сцены легкой эротики)'>R+ (есть сцены легкой эротики)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              style={{ margin: '18px 5px 0 5px', backgroundColor: 'white', borderRadius: '8px', zIndex: 0 }}
              item
              xs={12}
            >
              <FormControl variant='outlined' style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap' }}>
                  <InputLabel
                    style={{ transform: 'translate(0, 13px) scale(1)', left: 'auto' }}
                    ref={inputLabel}
                    htmlFor='outlined-age-simple'
                  >
                    {values.sort.length !== 0 ? values.sort : 'Тип сортировки'}
                  </InputLabel>
                </div>
                <Select
                  style={{ height: '40px' }}
                  value=''
                  onChange={event => handleChange(event.target.name, event.target.value)}
                  input={<OutlinedInput labelWidth={labelWidth} name='sort' id='outlined-age-simple' />}
                >
                  <MenuItem value=''>
                    <em>Пусто</em>
                  </MenuItem>
                  <MenuItem value='Рейтингу'>Рейтингу</MenuItem>
                  <MenuItem value='Алфавиту(А - Я)'>Алфавиту(А - Я)</MenuItem>
                  <MenuItem value='Алфавиту(Я - А)'>Алфавиту(Я - А)</MenuItem>
                  <MenuItem value='Дате выхода(сначала новые)'>Дате выхода(сначала новые)</MenuItem>
                  <MenuItem value='Дате выхода(сначала старые)'>Дате выхода(сначала старые)</MenuItem>
                  <MenuItem value='Количеству просмотров'>Количеству просмотров</MenuItem>
                  <MenuItem value='Количеству коментариев'>Количеству коментариев</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={12} style={{ margin: '18px 60px 9px 60px' }}>
              <Grid item xs={filterParametr.filter.status || filterParametr.search.status ? 9 : 12}>
                <Button
                  style={{ width: '100%', margin: '0 5px 0 0', backgroundColor: '#F1A246', borderRadius: '0px' }}
                  variant='contained'
                  onClick={searchAction}
                >
                  Искать
                </Button>
              </Grid>
              {filterParametr.filter.status || filterParametr.search.status ? (
                <Grid item xs={3} style={{ zIndex: 10 }}>
                  <input
                    onClick={filterReset}
                    className='filterResetButton'
                    type='image'
                    src='/static/images/newbutton.png'
                    alt='Reset button'
                  />
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
  return <div className='filterWraper'>...Loading</div>;
};

export default Filter;
