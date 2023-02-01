import { Body, Controller, Get, Post } from '@nestjs/common';
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

  // '43.16540434728322,-2.4239873886108403,43.18261784109349,-2.401371002197266'
  @Post()
  async getZoneDrinkPeaks(@Body() body): Promise<string> {
    return await this.osmService.getBoundsDrinkWatersPeaks(body.bbox);
  }
}
