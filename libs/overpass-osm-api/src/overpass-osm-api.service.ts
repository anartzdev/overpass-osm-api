import { Injectable } from '@nestjs/common';

import axios from 'axios';
import { OUTPUT_FORMAT, OVERPASS_API } from './constants/api';
import { createQueryInfo } from './helpers/query';
@Injectable()
export class OverpassOsmApiService {
  /**
   *
   * @param bbox Geographic zone boundary limits. Need two points. For example north east and just in diagonal south west
   * @returns
   */
  async getBoundsDrinkWatersPeaks(bbox: string) {
    const overpassQuery = createQueryInfo({
      bbox,
      outputFormat: OUTPUT_FORMAT.JSON,
      timeOutInSeconds: 50,
    });

    try {
      const res = await axios.post(OVERPASS_API, overpassQuery);
      console.log('OK', bbox);
      return res.data;
    } catch (err) {
      console.log('ERROR', bbox);
    }
  }
}
