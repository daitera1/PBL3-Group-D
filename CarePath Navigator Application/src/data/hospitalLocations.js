// Approximate coordinates for Hong Kong A&E hospitals.
// Used to place markers on the map, since the prediction API
// only returns hospital names.

export const hospitalLocations = {
  "Queen Elizabeth Hospital": {
    lat: 22.3099,
    lng: 114.1754,
    address: "30 Gascoigne Road, Jordan, Hong Kong",
  },
  "Princess Margaret Hospital": {
    lat: 22.3408,
    lng: 114.134,
    address: "2-10 Princess Margaret Hospital Road, Lai Chi Kok, Hong Kong",
  },
  "Tuen Mun Hospital": {
    lat: 22.4076,
    lng: 113.9764,
    address: "23 Tsing Chung Koon Road, Tuen Mun, Hong Kong",
  },
  "Pamela Youde Nethersole Eastern Hospital": {
    lat: 22.2697,
    lng: 114.2361,
    address: "3 Lok Man Road, Chai Wan, Hong Kong",
  },
  "United Christian Hospital": {
    lat: 22.3225,
    lng: 114.2262,
    address: "130 Hip Wo Street, Kwun Tong, Hong Kong",
  },
  "Prince of Wales Hospital": {
    lat: 22.3796,
    lng: 114.2011,
    address: "30-32 Ngan Shing Street, Sha Tin, Hong Kong",
  },
  "Alice Ho Miu Ling Nethersole Hospital": {
    lat: 22.4585,
    lng: 114.1747,
    address: "11 Chuen On Road, Tai Po, Hong Kong",
  },
  "Pok Oi Hospital": {
    lat: 22.445,
    lng: 114.035,
    address: "Au Tau, Yuen Long, Hong Kong",
  },
  "North District Hospital": {
    lat: 22.4967,
    lng: 114.124,
    address: "9 Po Kin Road, Sheung Shui, Hong Kong",
  },
  "Yan Chai Hospital": {
    lat: 22.369,
    lng: 114.1194,
    address: "7-11 Yan Chai Street, Tsuen Wan, Hong Kong",
  },
  "Queen Mary Hospital": {
    lat: 22.2704,
    lng: 114.1312,
    address: "102 Pok Fu Lam Road, Pok Fu Lam, Hong Kong",
  },
  "Kwong Wah Hospital": {
    lat: 22.3157,
    lng: 114.1723,
    address: "25 Waterloo Road, Yau Ma Tei, Hong Kong",
  },
  "Caritas Medical Centre": {
    lat: 22.3402,
    lng: 114.1524,
    address: "111 Wing Hong Street, Sham Shui Po, Hong Kong",
  },
  "Tseung Kwan O Hospital": {
    lat: 22.3179,
    lng: 114.2703,
    address: "2 Po Ning Lane, Hang Hau, Tseung Kwan O, Hong Kong",
  },
  "Ruttonjee Hospital": {
    lat: 22.2759,
    lng: 114.1748,
    address: "266 Queen's Road East, Wan Chai, Hong Kong",
  },
  "St John Hospital": {
    lat: 22.2085,
    lng: 114.029,
    address: "Cheung Chau Hospital Road, Tung Wan, Cheung Chau, Hong Kong",
  },
  "Tin Shui Wai Hospital": {
    lat: 22.4583,
    lng: 114.0017,
    address: "11 Tin Tan Street, Tin Shui Wai, Hong Kong",
  },
  "North Lantau Hospital": {
    lat: 22.2828,
    lng: 113.9391,
    address: "8 Chung Yan Road, Tung Chung, Hong Kong",
  },
};

// Finds coordinates for a hospital name, forgiving small differences
// like extra spaces or different capitalisation. Returns null (and logs
// a warning) when the hospital is unknown, so the app never crashes.
export function getHospitalLocation(name) {
  if (!name) return null;

  // 1. Exact match
  if (hospitalLocations[name]) return hospitalLocations[name];

  // 2. Case-insensitive, trimmed match
  const wanted = name.trim().toLowerCase();
  for (const [knownName, location] of Object.entries(hospitalLocations)) {
    if (knownName.toLowerCase() === wanted) return location;
  }

  // 3. Partial match, e.g. "Queen Elizabeth" matches "Queen Elizabeth Hospital"
  for (const [knownName, location] of Object.entries(hospitalLocations)) {
    const known = knownName.toLowerCase();
    if (known.includes(wanted) || wanted.includes(known)) return location;
  }

  console.warn(`No map coordinates found for hospital: "${name}"`);
  return null;
}
