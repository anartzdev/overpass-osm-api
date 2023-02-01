import { Test, TestingModule } from '@nestjs/testing';
import { OverpassOsmApiService } from './overpass-osm-api.service';

describe('OverpassOsmApiService', () => {
  let service: OverpassOsmApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OverpassOsmApiService],
    }).compile();

    service = module.get<OverpassOsmApiService>(OverpassOsmApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
