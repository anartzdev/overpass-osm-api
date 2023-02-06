import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OverpassOsmApiService } from './overpass-osm-api.service';

@Controller('osm-api')
export class OverpassOsmApiController {
  constructor(private readonly osmService: OverpassOsmApiService) {}

  // '43.16540434728322,-2.4239873886108403,43.18261784109349,-2.401371002197266'
  @Post()
  async getZoneMapFeatures(
    @Body() body: { bbox?: string; search?: string; filters?: Array<string> },
  ): Promise<string> {
    console.log(body);
    // Add manually filters
    // TODO take filters keys to generate values from constants
    // const filters = ['amenity=bar', 'amenity=restaurant', 'tourism=hotel'];
    const filters = body.filters || [];
    console.log(filters);
    if (body.search && (!body.bbox || !body.bbox.length)) {
      return await this.osmService.getBoundaryBoundsMapFeatures(
        await this.osmService.getLocationBySearch(body.search),
        filters,
      );
    }
    // "bbox": "43.2954421,-2.7176555,43.3274464,-2.6658945",
    return await this.osmService.getBoundaryBoundsMapFeatures(
      body.bbox,
      filters,
    );
  }

  @Get('/area/:search')
  async getArea(@Param('search') searchArea: string): Promise<string> {
    if (!searchArea) {
      throw new Error('Need search term!!');
    }
    return await this.osmService.getLocationBySearch(searchArea);
  }

  @Get('/help')
  getHelp() {
    return {
      intro: 'Instrucciones de ',
    };
  }
}
