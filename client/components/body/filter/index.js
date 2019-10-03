import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// import { Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import SearchContext from '../../../useContext/searchContext';

const Grid = dynamic(() => import('@material-ui/core/Grid'));

// import Link from 'next/link';

const Filter = ({ genres }) => {
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

  // React.useEffect(() => {
  //     fetch("/api/genre", {method: "GET"})
  //     .then(response => response.json())
  //     .then(data => {
  //         console.log(data);
  //         setGenre(data);
  //         setLoading(false);
  //     })
  //     .catch((error) => {
  //         console.error(error);
  //         setLoading(false);
  //     })
  // }, [loading])
  // console.log(genre);

  const inputLabel = React.useRef(null);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // setFilterParameter(loading)

  // }, [filterTru]);

  // function handleChange(event) {
  //   setValues(oldValues => ({
  //     ...oldValues,
  //     [event.target.name]: event.target.value
  //   }));
  // }

  const searchAction = async () => {
    const { genre } = values;
    const filterPervState = {
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
        Genre: genre.length !== 0 ? [genre.trim()] : [],
        TypeOf: values.type,
        Status: values.status,
        Year: {
          from:
            values.years.fromYear === '' ? 0 : values.years.fromYear === null ? 0 : parseInt(values.years.fromYear, 10),
          to: values.years.toYear === '' ? 0 : values.years.toYear === null ? 0 : parseInt(values.years.toYear, 10),
        },
        NumOfSeries: {
          from:
            values.countSeries.from === ''
              ? 0
              : values.countSeries.from === null
              ? 0
              : parseInt(values.countSeries.from, 10),
          to:
            values.countSeries.to === '' ? 0 : values.countSeries.to === null ? 0 : parseInt(values.countSeries.to, 10),
        },
        AgeRating: values.age,
      },
      search: {
        status: false,
        type: values.sort,
        param: 1,
      },
    };
    if (
      JSON.stringify(searchSetings.filter) === JSON.stringify(filterPervState) &&
      JSON.stringify(searchSetings.search) === JSON.stringify(searchPervState)
    ) {
      setFilterParameter({
        ...searchSetings,
        filter: { ...searchSetings.filter, status: false },
        search: { ...searchSetings.search, status: false },
      });
    } else if (
      JSON.stringify(searchSetings.filter) === JSON.stringify(filterPervState) &&
      JSON.stringify(searchSetings.search) !== JSON.stringify(searchPervState)
    ) {
      setFilterParameter({
        ...searchSetings,
        filter: { ...searchSetings.filter, status: false },
        search: { ...searchSetings.search, status: true },
      });
    } else if (
      JSON.stringify(searchSetings.filter) !== JSON.stringify(filterPervState) &&
      JSON.stringify(searchSetings.search) === JSON.stringify(searchPervState)
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

  const handleChange = event => {
    const { name } = event.target;
    const { value } = event.target;
    setValues({ ...values, [name]: value });
    if (name === 'from' || name === 'to') {
      setValues({ ...values, countSeries: { ...values.countSeries, [name]: value } });
    }
    if (name === 'fromYear' || name === 'toYear') {
      setValues({ ...values, years: { ...values.years, [name]: value } });
    }
  };

  const filterReset = () => {
    setValues({
      genre: '',
      type: '',
      status: '',
      sort: '',
      age: '',
      years: {
        fromYear: 0,
        toYear: 0,
      },
      countSeries: {
        from: 0,
        to: 0,
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
  };

  const listGenres =
    genre.length !== 0 ? (
      genre.map((genre, index) => {
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
  // console.log(listGenres);

  return (
    <>
      <FilterWraper>
        <Grid item container xs={12} spacing={0} style={{ backgroundImage: 'url(/static/images/filter-body.png)' }}>
          <Grid item xs={10}>
            {/* <input style = {{width: "36px"}} type="image" src="/static/images/deployWindow.png" alt="deploy window"/> */}
          </Grid>
          <Grid item xs={2}>
            {/* <a href = "/filter" > <img style = {{width: "26px", marginLeft: "40%", boxShadow: " -2px 2px 3px rgba(0,0,0,0.30)", opacity: "0.85"}} src="/static/images/newdeployWindow.png" alt=""/></a> */}
            <Link href='/filter' prefetch>
              <a>
                {' '}
                <img
                  style={{
                    width: '26px',
                    marginLeft: '40%',
                    boxShadow: ' -2px 2px 3px rgba(0,0,0,0.30)',
                    opacity: '0.85',
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
                onChange={event => handleChange(event)}
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
                onChange={event => handleChange(event)}
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
                onChange={event => handleChange(event)}
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
              placeholder='от'
              value={values.years.fromYear}
              name='fromYear'
              margin='dense'
              variant='outlined'
              onChange={event => handleChange(event)}
              style={{ width: '114%', backgroundColor: 'white', margin: '0 0 0 0', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={5} style={{ margin: '15px 0 0 0', borderRadius: '8px' }}>
            <TextField
              id='standard-name'
              placeholder='до'
              margin='dense'
              value={values.years.toYear}
              name='toYear'
              variant='outlined'
              onChange={event => handleChange(event)}
              style={{ width: '113%', backgroundColor: 'white', margin: '0 0 0 -13%', borderRadius: '8px' }}
            />
          </Grid>
          {/*  */}
          <Grid item xs={5} style={{ margin: '20px 33px 0 5px', borderRadius: '8px' }}>
            <TextField
              id='standard-name'
              placeholder='от'
              value={values.countSeries.from}
              onChange={event => handleChange(event)}
              margin='dense'
              variant='outlined'
              name='from'
              style={{ width: '114%', backgroundColor: 'white', margin: '0 0 0 0', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={5} style={{ margin: '20px 0 0 0', borderRadius: '8px' }}>
            <TextField
              id='standard-name'
              placeholder='до'
              margin='dense'
              onChange={event => handleChange(event)}
              variant='outlined'
              value={values.countSeries.to}
              name='to'
              style={{ width: '113%', backgroundColor: 'white', margin: '0 0 0 -13%', borderRadius: '8px' }}
            />
          </Grid>
          <Grid
            style={{ margin: '18px 5px 0 5px', backgroundColor: 'white', borderRadius: '8px', zIndex: '0' }}
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
                onChange={event => handleChange(event)}
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
            style={{ margin: '18px 5px 0 5px', backgroundColor: 'white', borderRadius: '8px', zIndex: '0' }}
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
                onChange={event => handleChange(event)}
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
              <Grid item xs={3} style={{ zIndex: '10' }}>
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
      </FilterWraper>
    </>
  );
};

const FilterWraper = styled.div`
  max-width: 262px;
  max-height: 525px;
  margin: 30px 0 0 30px;
`;

export default Filter;
