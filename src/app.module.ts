import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OverpassOsmApiModule } from '../libs/overpass-osm-api/src/overpass-osm-api.module';

@Module({
  imports: [OverpassOsmApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
