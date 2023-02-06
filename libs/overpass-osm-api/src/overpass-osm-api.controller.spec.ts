import { Test, TestingModule } from '@nestjs/testing';
import { OverpassOsmApiController } from './overpass-osm-api.controller';

describe('OverpassOsmApiController', () => {
  let controller: OverpassOsmApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OverpassOsmApiController],
    }).compile();

    controller = module.get<OverpassOsmApiController>(OverpassOsmApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
