import { Injectable } from '@nestjs/common';

import axios from 'axios';
@Injectable()
export class OverpassOsmApiService {
  private OVERPASS_API = 'https://overpass-api.de/api/interpreter';

  /**
   *
   * @param bbox Geographic zone boundary limits. Need two points. For example north east and just in diagonal south west
   * @returns
   */
  async getBoundsDrinkWatersPeaks(bbox: string) {
    console.log(bbox);
    const overpassQuery = `[bbox:${bbox}][out:json][timeout:100];
    (
        node["natural"="peak"];
        node["amenity"="drinking_water"];
        node["natural"="spring"];
        node["drinking_water"="yes"];
    );
    out body;
    `;
    try {
      const res = await axios.post(this.OVERPASS_API, overpassQuery);
      console.log('OK');
      return res.data;
    } catch (err) {
      console.log('ERROR');
    }
  }
}
