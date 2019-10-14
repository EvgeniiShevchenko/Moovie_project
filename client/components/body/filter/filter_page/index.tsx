import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import _ from 'lodash';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
// @ts-ignore
import Grider from 'react-grider';
import axios from 'axios';
import root from 'window-or-global';

// Import styles
import './filter.scss';
import './index.scss';

// import for ui component styling
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// import for table displaed
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// import for displaed dropdown button
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import for disaplaed list genres
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// import for styled filter-seting panel
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Scroll, { ScrollbarProps } from 'react-smooth-scrollbar';
import SearchContext from '../../../../useContext/searchContext';
// import {ScrollbarProps} from "@types/react-smooth-scrollbar";
import { GenreFace, ItemFace } from '../../../../interfaces';

const Scrollbar: React.ComponentType<ScrollbarProps> = Scroll;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: 'rgba(192,62,44,0)',
      //   overflowX: 'auto',
      //   overflowY: 'auto',
    },
    roottwo: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 540,
    },
    dropdownStyle: {
      border: '1px solid black',
      borderRadius: '5%',
      backgroundColor: 'rgba(223,158,149,1)',
      maxHeight: '300px',
    },
    table: {
      minWidth: 650,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    tableWrapper: {
      maxHeight: 407,
      overflow: 'auto',
    },
  })
);

const columns = [
  {
    id: 'name',
    label: '№',
    minWidth: 10,
    align: 'center' as const,
    pading: '14px 0px 14px 10px',
  },
  {
    id: 'code',
    label: 'Имя',
    minWidth: 50,
    align: 'left' as const,
    pading: '14px 0px 14px 10px',
  },
  {
    id: 'population',
    label: 'Тип',
    minWidth: 50,
    align: 'center' as const,
    pading: '14px 0px 14px 10px',
    //   format: (value) => value.toLocaleString(),
  },
  {
    id: 'size',
    label: 'Год',
    minWidth: 50,
    align: 'center' as const,
    pading: '14px 0px 14px 10px',
    //   format: (value) => value.toLocaleString(),
  },
  {
    id: 'density',
    label: 'Рейтинг',
    minWidth: 50,
    align: 'center' as const,
    pading: '14px 0px 14px 10px',
    //   format: (value) => value.toFixed(2),
  },
];

const exampleText = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus eveniet vel
    provident
    ab beatae deleniti quas dolorum tempora, repellendus temporibus ut unde eius debitis
    explicabo! Necessitatibus harum voluptatum aperiam.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus eveniet vel
    provident
    ab beatae deleniti quas dolorum tempora, repellendus temporibus ut unde eius debitis
    explicabo! Necessitatibus harum voluptatum aperiam.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus eveniet vel
    provident
    ab beatae deleniti quas dolorum tempora, repellendus temporibus ut unde eius debitis
    explicabo! Necessitatibus harum voluptatum aperiam.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus eveniet vel
    provident
    ab beatae deleniti quas dolorum tempora, repellendus temporibus ut unde eius debitis
    explicabo! Necessitatibus harum voluptatum aperiam.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus eveniet vel
    provident
    ab beatae deleniti quas dolorum tempora, repellendus temporibus ut unde eius debitis
    explicabo! Necessitatibus harum voluptatum aperiam.
`;

interface Props {
  data: ItemFace[];
  genres: GenreFace[];
}

const FilterPage: FunctionComponent<Props> = ({ data, genres }) => {
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

  // useStates
  const [initialData, setInitialData] = React.useState(data);
  console.log(initialData);
  const [selectButton, setSelectButton] = React.useState([]);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [yearsList, setYearsList] = React.useState([]);
  const [description, setDescription] = React.useState({
    id: '',
    name: '',
    originalname: '',
    slug: '',
    description: exampleText,
    genre: [],
    images: '',
    year: 0,
    country: '',
    typeof: '',
    numofseries: 0,
    studio: '',
    agerating: '',
  });
  const [scrollPage, setScrollPage] = React.useState(1);
  const [browserSeting, setBrowserSeting] = React.useState(false);
  const [buttomZoomClickHeandler, setButtomClickHeandler] = React.useState(false);

  // useRef
  const divScroll = React.useRef(null);
  const inputLabel = React.useRef(null);

  // Initilisation virables
  const defaultDescription = {
    id: '',
    name: '',
    originalname: '',
    slug: '',
    description: exampleText,
    genre: [''],
    images: '',
    year: 0,
    country: '',
    typeof: '',
    numofseries: 0,
    studio: '',
    agerating: '',
  };

  // useEfect
  React.useEffect(() => {
    const array = [];
    for (let i = 1980; i <= 2019; ++i) {
      array.push(i);
    }
    setYearsList([...array]);
    // if (_.get(divScroll, "current.scrollTop") !== undefined){
    //     console.log("I'm fine", _.get(divScroll, "current.scrollTop"));
    //             document.getElementById("style-2").addEventListener("scroll", () => console.log(divScroll.current.scrollTop));
    // };
  }, []);

  React.useEffect(() => {
    searchAction();
  }, [selectButton]);

  React.useEffect(() => {
    setBrowserSeting(false);
    fetch('http://localhost:5000/api/moovie/search/default', {
      method: 'POST',
      body: JSON.stringify(filterParametr),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setInitialData(data);
      })
      .catch(error => console.error(error));
  }, [filterParametr]);

  // const handleChange = panel => (_event, isExpanded) => {
  //     setExpanded(isExpanded ? panel : false);
  // };

  const classes = useStyles({});

  const selectButtonGenre = (id: any, name: string, info: string) => {
    const sameid = _.find(selectButton, ['id', id]);
    console.log(id, selectButton, sameid);

    if (sameid === undefined) {
      setSelectButton([
        ...selectButton,
        {
          id,
          name,
        },
      ]);
      setDescription({ ...defaultDescription, description: info });
    } else {
      const filter = _.filter(selectButton, ['id', !id]);

      setSelectButton(filter);
      setDescription({ ...defaultDescription, description: exampleText });
    }
  };

  const handleChange = (name: string | undefined, value: unknown): void => {
    setValues({ ...values, [name]: value });
    if (name === 'from' || name === 'to') {
      setValues({ ...values, countSeries: { ...values.countSeries, [name]: value } });
    }
    if (name === 'fromYear' || name === 'toYear') {
      setValues({ ...values, years: { ...values.years, [name]: value } });
    }
  };

  const handleLoadMore = async (page: number): Promise<void> => {
    // console.log("current page", page);
    const loadPage = page + scrollPage;
    // Some API call to fetch the next page
    const scrollRequest = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/moovie/search/default',
      data: JSON.stringify({ ...filterParametr, curentpage: loadPage }),
      headers: { 'Content-Type': 'application/json' },
    });

    setInitialData([...initialData, ...scrollRequest.data]);

    setScrollPage(loadPage + 1);
  };

  const searchAction = async () => {
    setScrollPage(1);
    const genre =
      selectButton.length !== 0
        ? _.map(selectButton, genre => {
            return _.trim(genre.name);
          })
        : [''];
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
        Genre: genre,
        TypeOf: values.type,
        Status: values.status,
        Year: {
          from:
            values.years.fromYear === 'От'
              ? 0
              : _.isString(values.years.fromYear)
              ? parseInt(values.years.fromYear, 10)
              : values.years.fromYear,
          to:
            values.years.toYear === 'До'
              ? 0
              : _.isString(values.years.toYear)
              ? parseInt(values.years.toYear, 10)
              : values.years.toYear,
        },
        NumOfSeries: {
          from:
            values.countSeries.from === 'От'
              ? 0
              : _.isString(values.countSeries.from)
              ? parseInt(values.countSeries.from, 10)
              : values.countSeries.from,
          to:
            values.countSeries.to === 'До'
              ? 0
              : _.isString(values.countSeries.to)
              ? parseInt(values.countSeries.to, 10)
              : values.countSeries.to,
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
    } else if (!_.isEqual(searchSetings.filter, filterPervState) && _.isEqual(searchSetings.search, searchPervState)) {
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

  const tableButtonHeandler = (item: ItemFace): void => {
    setBrowserSeting(true);
    setDescription({
      ...description,
      id: item._id,
      name: item.Name,
      originalname: item.OriginalName,
      slug: item.Slug,
      description: item.Description,
      genre: item.Genre,
      images: item.Images,
      year: item.Year,
      country: item.Country,
      typeof: item.TypeOf,
      numofseries: item.NumOfSeries,
      studio: item.Studio,
      agerating: item.AgeRating,
    });
  };

  const renderYears =
    yearsList.length !== 0 ? (
      _.map(yearsList, (year, index) => (
        <MenuItem key={index} value={year}>
          {year}
        </MenuItem>
      ))
    ) : (
      <MenuItem value=''>
        <em>None</em>
      </MenuItem>
    );

  if (root.window) {
    return (
      <>
        <Grider height='auto' width='100%' cols='25% 50% 25%' rows='307px 307px'>
          <Grider.Item colStart={1} colEnd={1} rowStart={1} rowEnd={buttomZoomClickHeandler ? 2 : 3}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'rgba(192,62,44,1)',
                borderRadius: '25px 0 0 0',
              }}
            >
              <h4>Жанры</h4>
            </div>
            <Scrollbar
              className='test'
              damping={0.05}
              thumbMinSize={10}
              renderByPixels
              alwaysShowTracks
              continuousScrolling
              style={
                buttomZoomClickHeandler
                  ? { maxHeight: '245px', overflow: 'auto' }
                  : { maxHeight: '553px', overflow: 'auto', borderRadius: '0 0 0 25px' }
              }
            >
              <div>
                <List style={{ backgroundColor: 'rgba(223, 158, 149, 1)' }} subheader={<li />}>
                  {_.map(genres, (genre, index) => {
                    return (
                      <ListItem
                        divider
                        onClick={() => selectButtonGenre(genre._id, genre.Name, genre.Description)}
                        button
                        key={index}
                      >
                        <ListItemText primary={genre.Name} />
                        <div>
                          {!_.isEmpty(_.find(selectButton, ['id', genre._id])) ? (
                            <img
                              style={{ width: '25px' }}
                              src='/static/images/genreactivebutton.png'
                              alt='Genre button active'
                            />
                          ) : (
                            <img
                              style={{ width: '25px' }}
                              src='/static/images/genredefaultbutton.png'
                              alt='Genre button default'
                            />
                          )}
                        </div>
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </Scrollbar>
          </Grider.Item>{' '}
          :
          <Grider.Item colStart={2} colEnd={2} rowStart={1} rowEnd={buttomZoomClickHeandler ? 1 : 2}>
            <div className='backgroundColor'>
              <div className='descriptionBlock'>
                {browserSeting ? <h4>{description.name}</h4> : <h4>Description</h4>}
              </div>
              <Scrollbar
                className='test'
                damping={0.01}
                thumbMinSize={1}
                renderByPixels
                alwaysShowTracks
                continuousScrolling
                style={
                  buttomZoomClickHeandler
                    ? { maxHeight: '540px', overflow: 'auto' }
                    : { maxHeight: '245px', overflow: 'auto' }
                }
              >
                <div>
                  <div>
                    {browserSeting ? (
                      <div>
                        <div style={{ marginTop: '9px' }}>
                          <div style={{ position: 'relative', right: '0px', float: 'right' }}>
                            <input
                              onClick={() => setButtomClickHeandler(!buttomZoomClickHeandler)}
                              className='filterPageButtomZoom'
                              type='image'
                              src='/static/images/filterbuttonzoom.png'
                              alt='Zoom-buttom'
                            />
                            <Link as={`/title/${description.slug}`} href={`/item?name=${description.slug}`}>
                              <a>
                                <img className='itemImages' src={description.images} alt={description.name} />
                              </a>
                            </Link>
                          </div>
                          <div>
                            <ul
                              style={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                padding: '0 0 10px 5px',
                                margin: 'auto',
                                listStyleType: 'none',
                              }}
                            >
                              <li>Выпуск: {description.year}</li>
                              <li>Производство: {description.country}</li>
                              <li>
                                Жанр:{' '}
                                {_.map(description.genre, (genreItem, index) => {
                                  return (
                                    <button
                                      type='button'
                                      key={index}
                                      id={`${index}`}
                                      style={{
                                        background: '#C03E2C',
                                        margin: '0 3px 0 0',
                                        borderRadius: '5px',
                                        lineHeight: '140%',
                                      }}
                                    >{`${genreItem} `}</button>
                                  );
                                })}
                              </li>
                              <li>Категория: {description.typeof}</li>
                              <li>Cерий: {description.numofseries}</li>
                              <li>Озвучивание: </li>
                              <li>Cтудия: {description.studio}</li>
                              <li>Возрастное ограничение: {description.agerating}</li>
                            </ul>
                            <p
                              style={{
                                textAlign: 'justify',
                                color: 'rgba(255, 255, 255, 0.7)',
                                margin: '0 8px 0 5px',
                              }}
                            >
                              {description.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p style={{ textAlign: 'justify', color: 'rgba(255, 255, 255, 0.7)' }}>
                        <input
                          onClick={() => setButtomClickHeandler(!buttomZoomClickHeandler)}
                          type='image'
                          style={{ width: '36px', float: 'right', marginLeft: '5px' }}
                          src='/static/images/filterbuttonzoom.png'
                          alt='Zoom-buttom'
                        />
                        {description.description}
                      </p>
                    )}
                  </div>
                </div>
              </Scrollbar>
            </div>
          </Grider.Item>
          <Grider.Item
            colStart={buttomZoomClickHeandler ? 1 : 2}
            colEnd={buttomZoomClickHeandler ? 1 : 3}
            rowStart={buttomZoomClickHeandler ? 2 : 2}
            rowEnd={browserSeting ? 2 : 2}
          >
            <Paper className={classes.root}>
              <div
                ref={divScroll}
                id='style-2'
                style={
                  buttomZoomClickHeandler
                    ? {
                        height: '307px',
                        minWidth: '300px',
                        overflow: 'auto',
                        borderRadius: '0 0 0 25px',
                      }
                    : { height: '307px', minWidth: '500px', overflow: 'auto' }
                }
              >
                <InfiniteScrollComponent
                  dataLength={initialData.length}
                  next={() => handleLoadMore(0)}
                  hasMore
                  scrollableTarget='style-2'
                >
                  <Table
                    style={buttomZoomClickHeandler ? { minWidth: '250px' } : { minWidth: '500px' }}
                    className={classes.table}
                  >
                    <TableHead style={{ backgroundColor: 'rgba(192, 62, 44, 1)' }}>
                      <TableRow>
                        {_.map(columns, column => (
                          <TableCell
                            size='small'
                            padding='checkbox'
                            align={column.align}
                            key={column.id}
                            style={{ width: column.minWidth, padding: column.pading }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ backgroundColor: 'rgba(130, 79, 79, 1)' }}>
                      {_.map(initialData, (item, index) => (
                        <TableRow
                          onClick={() => tableButtonHeandler(item)}
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell
                            align='center'
                            style={{ padding: '14px 0px 14px 10px' }}
                            component='th'
                            scope='row'
                          >
                            {index}
                          </TableCell>
                          <TableCell style={{ padding: '14px 0px 14px 10px' }} align='left'>
                            {item.Name}
                          </TableCell>
                          <TableCell style={{ padding: '14px 0px 14px 10px' }} align='center'>
                            {item.TypeOf}
                          </TableCell>
                          <TableCell style={{ padding: '14px 0px 14px 10px' }} align='center'>
                            {item.Year}
                          </TableCell>
                          <TableCell style={{ padding: '14px 0px 14px 10px' }} align='center'>
                            {item.Rating}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </InfiniteScrollComponent>
              </div>
            </Paper>
          </Grider.Item>
          <Grider.Item colStart={3} colEnd={3} rowStart={1} rowEnd={3}>
            <div>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(192,62,44,1)',
                    borderRadius: '0 25px 0 0',
                  }}
                >
                  <h4>Настройки</h4>
                </div>
                <Link href={{ pathname: '/' }}>
                  <a>
                    <img
                      className='filterPageButtomClose'
                      src='/static/images/filterbuttomzoom.png'
                      alt='filter-buttom-close'
                    />
                  </a>
                </Link>
              </div>
              <Scrollbar
                className='test'
                damping={0.01}
                thumbMinSize={1}
                renderByPixels
                alwaysShowTracks={false}
                continuousScrolling
                style={{ height: '552px', overflow: 'auto' }}
              >
                <div className={classes.root}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      style={{ backgroundColor: 'rgba(192, 62, 44, 0.5)' }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel1a-content'
                      id='panel1a-header'
                    >
                      <Typography className={classes.heading}>Filter Parametrs</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ backgroundColor: 'rgba(220, 185, 38, 0.5)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <FormControl
                          variant='outlined'
                          style={{
                            width: '100%',
                            backgroundColor: 'rgba(220, 185, 38, 0.2)',
                          }}
                        >
                          <InputLabel
                            style={{ transform: 'translate(95px, 12px) scale(1)' }}
                            ref={inputLabel}
                            htmlFor='outlined-age-simple'
                          >
                            {values.type.length !== 0 ? values.type : 'По типу'}
                          </InputLabel>
                          <Select
                            MenuProps={{ classes: { paper: classes.dropdownStyle } }}
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
                        <FormControl
                          variant='outlined'
                          style={{
                            width: '100%',
                            margin: '10px 0 0 0',
                            backgroundColor: 'rgba(220, 185, 38, 0.2)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <InputLabel
                              style={{
                                transform: 'translate(0, 13px) scale(1)',
                                left: 'auto',
                              }}
                              ref={inputLabel}
                              htmlFor='outlined-age-simple'
                            >
                              {values.status.length !== 0 ? values.status : 'По статусу'}
                            </InputLabel>
                          </div>
                          <Select
                            MenuProps={{ classes: { paper: classes.dropdownStyle } }}
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
                        <div
                          style={{
                            width: '100%',
                            margin: '10px 0 0 0',
                            boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)',
                            borderRadius: '3px',
                            backgroundColor: 'rgba(220, 185, 38, 0.2)',
                          }}
                        >
                          <h4 style={{ textAlign: 'center', margin: '4px' }}>Выборка по году выпуска</h4>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              flexWrap: 'nowrap',
                              margin: '2px 5px 5px 5px',
                              justifyContent: 'space-between',
                            }}
                          >
                            <FormControl variant='outlined' style={{ width: '100%' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                <InputLabel
                                  style={{
                                    transform: 'translate(0, 13px) scale(1)',
                                    left: 'auto',
                                  }}
                                  ref={inputLabel}
                                  htmlFor='outlined-age-simple'
                                >
                                  {values.years.fromYear === '0'
                                    ? 'От'
                                    : values.years.fromYear === null
                                    ? 'От'
                                    : values.years.fromYear}
                                </InputLabel>
                              </div>
                              <Select
                                MenuProps={{
                                  classes: { paper: classes.dropdownStyle },
                                }}
                                style={{ maxHeight: '40px' }}
                                value=''
                                onChange={event => handleChange(event.target.name, event.target.value)}
                                input={
                                  <OutlinedInput
                                    labelWidth={labelWidth}
                                    onChange={event => handleChange(event.target.name, event.target.value)}
                                    name='fromYear'
                                    id='outlined-age-simple'
                                  />
                                }
                              >
                                <MenuItem value='От'>
                                  <em>Пусто</em>
                                </MenuItem>
                                {renderYears}
                              </Select>
                            </FormControl>
                            <FormControl variant='outlined' style={{ width: '100%' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                <InputLabel
                                  style={{
                                    transform: 'translate(0, 13px) scale(1)',
                                    left: 'auto',
                                  }}
                                  ref={inputLabel}
                                  htmlFor='outlined-age-simple'
                                >
                                  {values.years.toYear === '0'
                                    ? 'До'
                                    : values.years.toYear === null
                                    ? 'До'
                                    : values.years.toYear}
                                </InputLabel>
                              </div>
                              <Select
                                MenuProps={{
                                  classes: { paper: classes.dropdownStyle },
                                }}
                                style={{ maxHeight: '40px' }}
                                value=''
                                onChange={event => handleChange(event.target.name, event.target.value)}
                                input={<OutlinedInput labelWidth={labelWidth} name='toYear' id='outlined-age-simple' />}
                              >
                                <MenuItem value='До'>
                                  <em>Пусто</em>
                                </MenuItem>
                                {renderYears}
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                        <div
                          style={{
                            width: '100%',
                            margin: '10px 0 10px 0',
                            boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)',
                            borderRadius: '3px',
                            backgroundColor: 'rgba(220, 185, 38, 0.2)',
                          }}
                        >
                          <h4 style={{ textAlign: 'center', margin: '4px' }}>Выборка по количеству серий</h4>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              flexWrap: 'nowrap',
                              margin: '2px 5px 5px 5px',
                              justifyContent: 'space-between',
                            }}
                          >
                            <TextField
                              className='focus'
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
                              style={{
                                width: '100%',
                                margin: '0 0 0 0',
                                borderRadius: '8px',
                              }}
                            />
                            <TextField
                              className='focus'
                              id='standard-name'
                              placeholder='До'
                              margin='dense'
                              onChange={event => handleChange(event.target.name, event.target.value)}
                              variant='outlined'
                              value={
                                values.countSeries.to === '0'
                                  ? 'До'
                                  : values.countSeries.to === null
                                  ? 'До'
                                  : values.countSeries.to
                              }
                              name='to'
                              style={{
                                width: '100%',
                                margin: '0 0 0 0',
                                borderRadius: '8px',
                              }}
                            />
                          </div>
                        </div>
                        <FormControl
                          variant='outlined'
                          style={{
                            width: '100%',
                            backgroundColor: 'rgba(220, 185, 38, 0.2)',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <InputLabel
                              style={{
                                transform: 'translate(0, 13px) scale(1)',
                                left: 'auto',
                              }}
                              ref={inputLabel}
                              htmlFor='outlined-age-simple'
                            >
                              {values.age.length !== 0 ? values.age : 'По возврасту'}
                            </InputLabel>
                          </div>
                          <Select
                            MenuProps={{ classes: { paper: classes.dropdownStyle } }}
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
                        <FormControl
                          variant='outlined'
                          style={{
                            width: '100%',
                            margin: '10px 0 0 0',
                            backgroundColor: 'rgba(220, 185, 38, 0.2)',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <InputLabel
                              style={{
                                transform: 'translate(0, 13px) scale(1)',
                                left: 'auto',
                              }}
                              ref={inputLabel}
                              htmlFor='outlined-age-simple'
                            >
                              {values.sort.length !== 0 ? values.sort : 'Тип сортировки'}
                            </InputLabel>
                          </div>
                          <Select
                            MenuProps={{ classes: { paper: classes.dropdownStyle } }}
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
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <div className='filterButtonWithInfoGroup'>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                      <input
                        onClick={() => {
                          setDescription({ ...defaultDescription, description: exampleText });
                          searchAction();
                        }}
                        style={{ width: '150px' }}
                        type='image'
                        src='/static/images/search_button.png'
                        alt='Search buttom'
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <input
                        style={{ width: '100%', height: '100%' }}
                        type='image'
                        src='/static/images/info_framenew.png'
                        alt='Information frame'
                      />
                    </div>
                  </div>
                </div>
              </Scrollbar>
            </div>
          </Grider.Item>
        </Grider>
      </>
    );
  }
  return <div>Loading...</div>;
};

export default FilterPage;
