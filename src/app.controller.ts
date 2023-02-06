import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OverpassOsmApiService } from 'mugan86-osm-api/overpass-osm-api';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly osmService: OverpassOsmApiService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // '43.16540434728322,-2.4239873886108403,43.18261784109349,-2.401371002197266'
  @Post()
  async getZoneDrinkPeaks(
    @Body() body: { bbox?: string; search?: string }
  ): Promise<string> {
    // Add manually filters
    // TODO take filters keys to generate values from constants
    const filters =  [
      "amenity=bar",
      "amenity=restaurant",
      "tourism=hotel"
    ];
    if (body.search && !body.bbox) {
      return await this.osmService.getBoundsDrinkWatersPeaks(
        await this.osmService.getLocationBySearch(body.search), filters
      );
    }
    // "bbox": "43.2954421,-2.7176555,43.3274464,-2.6658945",
    return await this.osmService.getBoundsDrinkWatersPeaks(body.bbox, filters);
  }

  @Get('/area/:search')
  async getArea(@Param('search') searchArea: string): Promise<string> {
    if (!searchArea) {
      throw new Error('Need search term!!');
    }
    return await this.osmService.getLocationBySearch(searchArea);
  }
}
