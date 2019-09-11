import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateMoovieDto } from './dto/create-moovie.dto';
import { Moovie } from './interfaces/moovie.interface';

const extend = function(target, targettwo) {
  if (!arguments[1]) {
      return;
  }
  let i: number;
  for (i = 1; i < arguments.length; i++) {
      const source = arguments[i];

      console.log(source);

      for (const prop of source) {
          if (!target[prop] && source.hasOwnProperty(prop)) {
              target[prop] = source[prop];
          }
          if (!targettwo[prop] && source.hasOwnProperty(prop)) {
            targettwo[prop] = source[prop];
          }
      }
  }
};

@Injectable()
export class MooviesService {
  constructor(@Inject('MOOVIE_MODEL') private readonly moovieModel: Model<Moovie>) {}

  async create(createMoovieDto: CreateMoovieDto): Promise<Moovie> {
    const createdmoovie = new this.moovieModel(createMoovieDto);
    return await createdmoovie.save();
  }

  async findAll(): Promise<Moovie[]> {
    return await this.moovieModel.find().exec();
    // return [{name: "evgenii", price: 23}]
  }

  async findOne(id): Promise<Moovie[]> {
    const result = await this.moovieModel.find({_id: id}).exec();
    console.log(result);
    return result;

    // return [{name: "evgenii", price: 23}]
  }

  async filterSearch(curentPage, skip, limit, filter, search, itemName): Promise<Moovie[]> {
    const query = {};

    if (itemName.length !== 0) {
      const tea = {Name: new RegExp(`${itemName}`, 'i')};
      console.log(tea);
      extend(query, tea);
    }

    // if(filter.status){
    //   extend(query, {[filter.searchScope]: typeof filter.parametr === "string" ? new RegExp(`${filter.parametr}`, 'i') : filter.parametr})
      // console.log("Yoooo!!!!", query);
    // };
    // {Genre: {$in: ["Комедия"]}, "TypeOf": "Сериал", "Year": {$gte: 2007, $lte: 2019},
    //  "NumOfSeries": {$gt: 12, $lte: 27}, "AgeRating": /PG-13/}
    if (filter.status) {
      let bufer = {};
      // switch (filter) {
      //   case filter.Genre.length !== 0:
      //     const tea = {...bufer, Genre: "fnf"}
      //     console.log(tea);
      //     bufer = tea

      //   default:
      //     bufer = {"notfing": "find", "You": "luser!"};
      // }
      if (filter.Genre.length !== 0) {
        const tea = {...bufer, Genre: {$in: [filter.Genre]}};
        console.log(tea);
        bufer = tea;
      }

      if (filter.TypeOf.length !== 0) {
        const tea = {...bufer, TypeOf: filter.TypeOf};
        console.log(tea);
        bufer = tea;
      }

      if (filter.Status.length !== 0) {
        const tea = {...bufer, Status: new RegExp(`${filter.Status}`, 'i')};
        console.log(tea);
        bufer = tea;
      }

      if (filter.Year.from !== 0 && filter.Year.to !== 0) {
        const tea = {...bufer, Year: {$gte: filter.Year.from, $lte: filter.Year.to}};
        console.log(tea);
        bufer = tea;
      } else if (filter.Year.from !== 0 && filter.Year.to === 0) {
        const tea = {...bufer, Year: {$gte: filter.Year.from}};
        console.log(tea);
        bufer = tea;
      } else if (filter.Year.from === 0 && filter.Year.to !== 0) {
        const tea = {...bufer, Year: {$lte: filter.Year.to}};
        console.log(tea);
        bufer = tea;
      }

      if (filter.NumOfSeries.from !== 0 && filter.NumOfSeries.to !== 0) {
        const tea = {...bufer, NumOfSeries: {$gte: filter.NumOfSeries.from, $lte: filter.NumOfSeries.to}};
        console.log(tea);
        bufer = tea;
      } else if (filter.NumOfSeries.from !== 0 && filter.NumOfSeries.to === 0) {
        const tea = {...bufer, NumOfSeries: {$gte: filter.NumOfSeries.from}};
        console.log(tea);
        bufer = tea;
      } else if (filter.NumOfSeries.from === 0 && filter.NumOfSeries.to !== 0) {
        const tea = {...bufer, NumOfSeries: {$lte: filter.NumOfSeries.to}};
        console.log(tea);
        bufer = tea;
      }

      if (filter.AgeRating.length !== 0) {
        const tea = {...bufer, AgeRating: filter.AgeRating};
        console.log(tea);
        bufer = tea;
      }

      extend(query, bufer);
      console.log('bufer!!!!', bufer);
    }

    let searchTitle = '_id';
    let searchParam = 1;

    if (search.status) {
      if (search.type === 'Рейтингу') {
        searchTitle = 'Rating';
        searchParam = -1;
      } else if (search.type === 'Алфавиту(А - Я)') {
        searchTitle = 'Name';
      } else if (search.type === 'Алфавиту(Я - А)') {
        searchTitle = 'Name';
        searchParam = -1;
      } else if (search.type === 'Дате выхода(сначала новые)') {
        searchTitle = 'Year';
        searchParam = -1;
      } else if (search.type === 'Дате выхода(сначала старые)') {
        searchTitle = 'Year';
      } else if (search.type === 'Количеству просмотров') {
        searchTitle = 'Looked';
        searchParam = -1;
      } else if (search.type === 'Количеству коментариев') {
        searchTitle = 'Commented';
        searchParam = -1;
      }
    }

    console.log('query!!!!', query);

    const result = await this.moovieModel.find(query)
      .skip(curentPage * skip)
      .limit(limit)
      .sort({
        [searchTitle]: searchParam,
      });
    // console.log(result);
    return result;
  }
}
