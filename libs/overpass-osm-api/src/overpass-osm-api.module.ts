import { Module } from '@nestjs/common';
import { OverpassOsmApiService } from './overpass-osm-api.service';

@Module({
  providers: [OverpassOsmApiService],
  exports: [OverpassOsmApiService],
})
export class OverpassOsmApiModule {}
