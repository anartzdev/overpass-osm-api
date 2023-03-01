import { Controller, Post, Body, Get, Param, Logger } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { FEATURES } from './constants/map-features';
import { CreateSearchApiDto } from './overpass-osm-api.dto';
import { OverpassOsmApiService } from './overpass-osm-api.service';

@Controller('osm-api')
export class OverpassOsmApiController {
  constructor(private readonly osmService: OverpassOsmApiService) {}

  // '43.16540434728322,-2.4239873886108403,43.18261784109349,-2.401371002197266'
  @Post()
  @ApiBody({ type: CreateSearchApiDto })
  @ApiOperation({
    summary:
      'Get OSM map objects with select Boundary Box / Area and apply desire filters',
      description: `
      Examples to make correctly requests:
      ======================================
      Boundary Box Uknown, for example Madrid is area.

      {
        "search": "Madrid",
        "filters": ["atm=yes",
                "amenity=atm"]
      }

      ======================================
      With Boundary Box (Madrid):
      {
        "bbox": "40.3119774,-3.8889539,40.6437293,-3.5179163",
        "filters": ["atm=yes",
                "amenity=atm"]
      }
      `,
  })
  async getZoneMapFeatures(@Body() body: CreateSearchApiDto): Promise<string> {
    Logger.log(`Input data : ${body}`);
    // Add manually filters
    // TODO take filters keys to generate values from constants
    // const filters = ['amenity=bar', 'amenity=restaurant', 'tourism=hotel'];
    const filters = body.filters || [];
    if (body.search && (!body.bbox || !body.bbox.length)) {
      return await this.osmService.getBoundaryBoundsMapFeatures(
        await this.osmService.getLocationBySearch(body.search),
        filters,
      );
    }
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

  @Get('/help/:language')
  getHelp(@Param('language') selectLanguage): { type: string; filterValues: string[]; description: string; url: string; }[] {
    return FEATURES.map((feature) => {
      return {
        type: feature.key,
        filterValues: [
          ...(feature.value1 !== '' ? [feature.value1] : []),
          ...(feature.value2 !== '' ? [feature.value2] : []),
          ...(feature.value3 !== '' ? [feature.value3] : []),
          ...(feature.value4 !== '' ? [feature.value4] : []),
          ...(feature.value5 !== '' ? [feature.value5] : []),
        ],
        description:
        selectLanguage === 'es' ? feature.description_es : feature.description_en,
        url: feature.info,
      };
    });
  }
}
