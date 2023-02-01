import { Module } from '@nestjs/common';
import { OverpassOsmApiService } from 'mugan86-osm-api/overpass-osm-api';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, OverpassOsmApiService],
})
export class AppModule {}
