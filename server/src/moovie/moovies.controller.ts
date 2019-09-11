import { Controller, Get, Post, Body, Param, Req, Res, Request } from '@nestjs/common';
import { CreateMoovieDto } from './dto/create-moovie.dto';
import { MooviesService } from './moovies.service';
import { Moovie } from './interfaces/moovie.interface';
import { CreateFilterDTO } from './dto/mydto.dto';

@Controller('api/moovie')
export class MoovieController {
  constructor(private readonly mooviesService: MooviesService) {}

  @Get()
  async findAll(): Promise<Moovie[]> {
    return this.mooviesService.findAll();
    // return [{name: "evgenii", price: 23}]
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Moovie[]> {
    console.log(params.id);
    return this.mooviesService.findOne(params.id);
  }

  @Post()
  async create(@Body() CreateMoovieDto: CreateMoovieDto) {
    this.mooviesService.create(CreateMoovieDto);
  }

  // @Post()
  // async PaginationRequiset(@Req() req, @Res() res) {
  //   console.log("HaHA!", req.body);
  //   return await res.send(req.body);
  //   // return this.mooviesService.filterSearch(body.curentpage, body.skip, body.limit, body.filter, body.search);
  // }
  // @Header('content-type', 'text/html')
  @Post('search/:action')
  async PaginationRequiset(@Body() body: CreateFilterDTO): Promise<Moovie[]> {
    console.log('HaHa', body);
    return this.mooviesService.filterSearch(body.curentpage, body.skip, body.limit, body.filter, body.search, body.itemName);
  }

}
