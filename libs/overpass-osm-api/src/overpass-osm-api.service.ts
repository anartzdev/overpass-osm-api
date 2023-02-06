import { Injectable, Logger } from '@nestjs/common';

import axios from 'axios';
import {
  OUTPUT_FORMAT,
  OVERPASS_API,
  NOMINATIM_OSM_API,
} from './constants/api';
import { createQueryInfo } from './helpers/query';
@Injectable()
export class OverpassOsmApiService {
  /**
   *
   * @param bbox Geographic zone boundary limits. Need two points. For example north east and just in diagonal south west
   * @returns
   */
  async getBoundsDrinkWatersPeaks(bbox: string, filters: Array<string> = []) {
    const overpassQuery = createQueryInfo({
      bbox,
      outputFormat: OUTPUT_FORMAT.JSON,
      timeOutInSeconds: 50,
      filters
    });

    console.log(overpassQuery)

    try {
      const res = await axios.post(OVERPASS_API, overpassQuery);
      console.log('OK', bbox);
      return res.data;
    } catch (err) {
      console.log('ERROR', bbox);
    }
  }

  /**
   * Format Boundary Box from result that take in Nominatim API Search
   * @param boundingbox [south, north, west, east]
   * @returns string 'south,west,north,east'
   */
  async getLocationBoundaryBox(boundingbox: Array<string>) {
    // Convert [south, north, west, east] => [south,west,north,east]
    const temp = boundingbox[1];
    boundingbox[1] = boundingbox[2];
    boundingbox[2] = temp;
    return boundingbox.join(',');
  }

  async getLocationBySearch(searchTerm: string) {
    try {
      Logger.log(`Take data from: ${NOMINATIM_OSM_API}${searchTerm}`);
      const res = await axios.get(`${NOMINATIM_OSM_API}${searchTerm}`);
      console.log('OK');
      return this.getLocationBoundaryBox(res.data[0]['boundingbox']);
    } catch (err) {
      console.log('ERROR', `${NOMINATIM_OSM_API}${searchTerm}`);
    }
  }
}
