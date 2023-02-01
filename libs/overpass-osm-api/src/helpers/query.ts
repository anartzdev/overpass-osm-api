import { OUTPUT_FORMAT } from '../constants/api';

export const createQueryInfo = (queryParams: {
  bbox: string;
  outputFormat: string;
  timeOutInSeconds: number;
}) => {
  if (!queryParams.bbox) {
    throw new Error(`
        ¡¡¡¡ NEED PASS BOUNDARY BOX LIMITS IF YOU WANT USE QUERY WITH BOUNDARIES BOX !!!!
        ==============================================================================
        Pass value with next format: 
        <latitude_north_east>,<longitude_north_east>,<latitude_south_west>,<longitude_south_west>

        For Example:
        43.16540434728322,-2.4239873886108403,43.18261784109349,-2.401371002197266
        `);
  }

  const queryTimeLimit = queryParams.timeOutInSeconds || 50;

  const outputDataFormat = queryParams.outputFormat || OUTPUT_FORMAT.JSON;

  // TODO add query string with filters dinamically
  const overpassQueryHead = `
    [bbox:${queryParams.bbox}][out:${outputDataFormat}][timeout:${queryTimeLimit}];
    (`;

  const filters = `
    node["natural"="peak"];
    node["amenity"="drinking_water"];
    node["natural"="spring"];
    node["drinking_water"="yes"];
    `;
  const outBody = `
    );
    out body;
    `;

  return `
    ${overpassQueryHead}${filters}${outBody}
    `;
};
