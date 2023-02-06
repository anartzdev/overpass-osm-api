// Map features take from https://wiki.openstreetmap.org/wiki/Map_features

const AMENITY_KEY = 'amenity';
export const AMENITY = {
  bank: `"${AMENITY_KEY}"="bank"`,
  bar: `"${AMENITY_KEY}"="bar"`,
  college: `${AMENITY_KEY}=college`,
  ice_cream: `"${AMENITY_KEY}"="ice_cream"`,
};

const FEATURES_DESCRIPTION = {
  AMENITY: {
    SUSTENANCE: {
      BAR: `${AMENITY.bar} (https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dbar)`,
    },
    EDUCATION: {
      COLLEGE: `${AMENITY.college} (https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dcollege)`,
    },
  },
};
