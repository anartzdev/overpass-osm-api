import { Module } from '@nestjs/common';
import { OverpassOsmApiService } from './overpass-osm-api.service';
import { OverpassOsmApiController } from './overpass-osm-api.controller';

@Module({
  providers: [OverpassOsmApiService],
  exports: [OverpassOsmApiService],
  controllers: [OverpassOsmApiController],
})
export class OverpassOsmApiModule {}
