import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OverpassOsmApiService } from 'mugan86-osm-api/overpass-osm-api';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly osmService: OverpassOsmApiService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  }
