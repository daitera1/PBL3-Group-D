export type Congestion = "low" | "moderate" | "high";
export type WaitCategory = "A&E Wait" | "Clinic Queue" | "Appointment Availability";
export type FacilityType = "Clinic" | "General Hospital" | "Emergency Hospital" | "Specialty Center";
export type LanguageSupport =
  | "Fully Bilingual Staff"
  | "Basic Communication Available"
  | "Translation Service Available"
  | "No Verified Language Support";

export interface LanguageEntry {
  language: string;
  level: LanguageSupport;
}

export interface Hospital {
  id: string;
  name: string;
  facilityType: FacilityType;
  address: string;
  area: string;
  description: string;
  distanceMiles: number;
  specialties: string[];
  departments: string[];
  insurance: string[];
  languages: LanguageEntry[];
  languagesVerifiedOn: string;
  // Wait prediction
  waitCategory: WaitCategory;
  waitLow: number;
  waitHigh: number;
  congestion: Congestion;
  confidenceScore: number;
  // For map positioning, as percentages over the map image (legacy)
  mapX: number;
  mapY: number;
  // Real-world coordinates for live map
  lat: number;
  lng: number;
  // Synthetic predicted busy hours, 0..23 -> 0..100
  busyHours: number[];
  // Anonymous reviews
  reviewSummary: string;
  reviewCount: number;
  rating: number;
  // Visit prep
  documents: string[];
  arrivalInstructions: string;
  // Facility photo URL
  photo: string;
  // Current model-predicted wait midpoint in minutes (XGBoost mean)
  predictedWaitMinutes: number;
  // Model uncertainty band (half the P25→P75 spread)
  uncertaintyMinutes: number;
  // Cold start case
  coldStart?: boolean;
}



// ---------------------------------------------------------------------------
// Hong Kong public-hospital A&E dataset, seeded from the XGBoost prediction
// model (xgboost_predictions_with_confidence.csv). low/high are the P25/P75
// of predicted wait times per hospital; busyHours are hourly means normalised
// to 0–100; confidence is derived from the model's mean confidence_score.
// ---------------------------------------------------------------------------

interface HospitalSeed {
  id: string;
  name: string;
  facilityType: FacilityType;
  address: string;
  area: string;
  lat: number;
  lng: number;
  distanceKm: number;
  specialties: string[];
  languages: LanguageEntry[];
  waitLow: number;
  waitHigh: number;
  meanWait: number;
  confScore: number;
  busy: number[];
  coldStart?: boolean;
}

const seeds: HospitalSeed[] = [
  { id: "alice-ho-nethersole", name: "Alice Ho Miu Ling Nethersole Hospital", facilityType: "General Hospital", address: "11 Chuen On Road, Tai Po, N.T.", area: "Tai Po", lat: 22.4574, lng: 114.1740, distanceKm: 22.4, specialties: ["A&E", "Internal Medicine", "Orthopedics"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Basic Communication Available"},{language:"Mandarin",level:"Translation Service Available"} ], waitLow: 59.59, waitHigh: 64.55, meanWait: 62.47, confScore: 90.39, busy: [0,97,96,96,100,98,95,92,88,86,87,92,93,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "caritas-medical", name: "Caritas Medical Centre", facilityType: "General Hospital", address: "111 Wing Hong Street, Sham Shui Po, Kowloon", area: "Sham Shui Po", lat: 22.3400, lng: 114.1520, distanceKm: 4.1, specialties: ["A&E", "Geriatrics", "Internal Medicine"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Basic Communication Available"},{language:"Mandarin",level:"Translation Service Available"},{language:"Filipino",level:"Translation Service Available"} ], waitLow: 44.34, waitHigh: 54.2, meanWait: 49.71, confScore: 87.74, busy: [0,97,99,99,95,96,98,81,74,74,79,90,100,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "kwong-wah", name: "Kwong Wah Hospital", facilityType: "General Hospital", address: "25 Waterloo Road, Yau Ma Tei, Kowloon", area: "Yau Ma Tei", lat: 22.3149, lng: 114.1727, distanceKm: 2.6, specialties: ["A&E", "Obstetrics", "Cardiology"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Fully Bilingual Staff"},{language:"Mandarin",level:"Translation Service Available"} ], waitLow: 60.36, waitHigh: 80.27, meanWait: 69.9, confScore: 90.86, busy: [0,90,99,99,100,97,83,69,59,64,76,86,82,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "north-district", name: "North District Hospital", facilityType: "General Hospital", address: "9 Po Kin Road, Sheung Shui, N.T.", area: "Sheung Shui", lat: 22.4966, lng: 114.1247, distanceKm: 25.8, specialties: ["A&E", "Internal Medicine", "Surgery"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Basic Communication Available"},{language:"Mandarin",level:"Translation Service Available"} ], waitLow: 46.13, waitHigh: 54.81, meanWait: 51.41, confScore: 88.06, busy: [0,92,94,97,99,100,99,86,76,79,81,85,93,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "north-lantau", name: "North Lantau Hospital", facilityType: "General Hospital", address: "8 Chung Yan Road, Tung Chung, Lantau", area: "Tung Chung", lat: 22.2830, lng: 113.9410, distanceKm: 30.6, specialties: ["A&E", "General Practice"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Basic Communication Available"},{language:"Mandarin",level:"Translation Service Available"} ], waitLow: 33.42, waitHigh: 37.61, meanWait: 35.68, confScore: 83.2, busy: [0,89,89,92,89,87,98,90,83,84,87,100,92,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "pamela-youde", name: "Pamela Youde Nethersole Eastern Hospital", facilityType: "General Hospital", address: "3 Lok Man Road, Chai Wan, Hong Kong Island", area: "Chai Wan", lat: 22.2670, lng: 114.2360, distanceKm: 9.3, specialties: ["A&E", "Oncology", "Internal Medicine"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Fully Bilingual Staff"},{language:"Mandarin",level:"Translation Service Available"} ], waitLow: 45.49, waitHigh: 54.4, meanWait: 49.95, confScore: 87.64, busy: [0,98,100,94,88,95,90,75,70,76,86,99,97,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "pok-oi", name: "Pok Oi Hospital", facilityType: "General Hospital", address: "Au Tau, Yuen Long, N.T.", area: "Yuen Long", lat: 22.4453, lng: 114.0407, distanceKm: 30.1, specialties: ["A&E", "Chinese Medicine", "Obstetrics"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Basic Communication Available"},{language:"Mandarin",level:"Translation Service Available"} ], waitLow: 30.78, waitHigh: 33.38, meanWait: 32.09, confScore: 81.5, busy: [0,97,96,97,98,100,96,91,89,90,94,98,98,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "prince-of-wales", name: "Prince of Wales Hospital", facilityType: "Emergency Hospital", address: "30-32 Ngan Shing Street, Sha Tin, N.T.", area: "Sha Tin", lat: 22.3796, lng: 114.2010, distanceKm: 11.8, specialties: ["A&E", "Trauma", "Cardiology", "Neurology"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Fully Bilingual Staff"},{language:"Mandarin",level:"Fully Bilingual Staff"} ], waitLow: 51.57, waitHigh: 83.35, meanWait: 68.91, confScore: 90.52, busy: [0,98,98,100,100,100,81,67,53,52,56,68,88,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "princess-margaret", name: "Princess Margaret Hospital", facilityType: "Emergency Hospital", address: "2-10 Princess Margaret Hospital Road, Lai Chi Kok, Kowloon", area: "Lai Chi Kok", lat: 22.3406, lng: 114.1360, distanceKm: 6.2, specialties: ["A&E", "Infectious Diseases", "Trauma"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Fully Bilingual Staff"},{language:"Mandarin",level:"Translation Service Available"} ], waitLow: 54.13, waitHigh: 62.61, meanWait: 58.71, confScore: 89.52, busy: [0,92,93,100,100,100,100,97,81,77,85,95,100,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "queen-elizabeth", name: "Queen Elizabeth Hospital", facilityType: "Emergency Hospital", address: "30 Gascoigne Road, Yau Ma Tei, Kowloon", area: "Yau Ma Tei", lat: 22.3096, lng: 114.1746, distanceKm: 2.1, specialties: ["A&E", "Trauma", "Neurosurgery"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Fully Bilingual Staff"},{language:"Mandarin",level:"Fully Bilingual Staff"} ], waitLow: 23.64, waitHigh: 33.72, meanWait: 29.1, confScore: 81.15, busy: [0,92,97,100,99,97,90,80,62,61,61,64,79,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "queen-mary", name: "Queen Mary Hospital", facilityType: "Emergency Hospital", address: "102 Pok Fu Lam Road, Pok Fu Lam, Hong Kong Island", area: "Pok Fu Lam", lat: 22.2703, lng: 114.1310, distanceKm: 5.5, specialties: ["A&E", "Transplant", "Cardiology"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Fully Bilingual Staff"},{language:"Mandarin",level:"Fully Bilingual Staff"} ], waitLow: 46.05, waitHigh: 56.82, meanWait: 51.78, confScore: 88.08, busy: [0,92,96,89,95,100,97,89,78,79,90,95,96,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "ruttonjee", name: "Ruttonjee Hospital", facilityType: "General Hospital", address: "266 Queen's Road East, Wan Chai, Hong Kong Island", area: "Wan Chai", lat: 22.2748, lng: 114.1730, distanceKm: 3.3, specialties: ["A&E", "Respiratory Medicine", "Geriatrics"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Fully Bilingual Staff"},{language:"Mandarin",level:"Translation Service Available"} ], waitLow: 39.81, waitHigh: 45.43, meanWait: 42.42, confScore: 85.85, busy: [0,96,98,96,96,94,92,94,85,87,93,100,98,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "st-john", name: "St John Hospital", facilityType: "Clinic", address: "Cheung Chau Hospital Road, Cheung Chau", area: "Cheung Chau", lat: 22.2050, lng: 114.0290, distanceKm: 20.5, specialties: ["A&E", "General Practice"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Basic Communication Available"} ], waitLow: 2.68, waitHigh: 22.92, meanWait: 12.53, confScore: 80.0, busy: [0,45,38,42,36,32,35,61,71,85,100,97,61,0,0,0,0,0,0,0,0,0,0,0], coldStart: true },
  { id: "tin-shui-wai", name: "Tin Shui Wai Hospital", facilityType: "General Hospital", address: "11 Tin Tan Street, Tin Shui Wai, N.T.", area: "Tin Shui Wai", lat: 22.4570, lng: 113.9950, distanceKm: 33.4, specialties: ["A&E", "Family Medicine"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Basic Communication Available"},{language:"Mandarin",level:"Translation Service Available"} ], waitLow: 26.86, waitHigh: 28.67, meanWait: 27.83, confScore: 80.23, busy: [0,96,96,96,94,94,99,95,92,93,96,100,100,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "tseung-kwan-o", name: "Tseung Kwan O Hospital", facilityType: "General Hospital", address: "2 Po Ning Lane, Hang Hau, Tseung Kwan O, N.T.", area: "Tseung Kwan O", lat: 22.3178, lng: 114.2740, distanceKm: 12.9, specialties: ["A&E", "Internal Medicine", "Surgery"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Basic Communication Available"},{language:"Mandarin",level:"Translation Service Available"} ], waitLow: 39.65, waitHigh: 48.28, meanWait: 44.07, confScore: 86.09, busy: [0,96,93,92,87,94,91,81,70,71,80,88,100,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "tuen-mun", name: "Tuen Mun Hospital", facilityType: "Emergency Hospital", address: "23 Tsing Chung Koon Road, Tuen Mun, N.T.", area: "Tuen Mun", lat: 22.4053, lng: 113.9760, distanceKm: 28.7, specialties: ["A&E", "Trauma", "Oncology"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Basic Communication Available"},{language:"Mandarin",level:"Translation Service Available"} ], waitLow: 34.38, waitHigh: 39.78, meanWait: 37.06, confScore: 83.75, busy: [0,96,97,97,94,93,100,100,88,84,85,89,94,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "united-christian", name: "United Christian Hospital", facilityType: "General Hospital", address: "130 Hip Wo Street, Kwun Tong, Kowloon", area: "Kwun Tong", lat: 22.3220, lng: 114.2280, distanceKm: 8.7, specialties: ["A&E", "Obstetrics", "Paediatrics"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Basic Communication Available"},{language:"Mandarin",level:"Translation Service Available"},{language:"Filipino",level:"Translation Service Available"} ], waitLow: 51.63, waitHigh: 68.51, meanWait: 60.84, confScore: 89.69, busy: [0,87,85,85,95,100,89,72,61,61,66,69,79,0,0,0,0,0,0,0,0,0,0,0] },
  { id: "yan-chai", name: "Yan Chai Hospital", facilityType: "General Hospital", address: "7-11 Yan Chai Street, Tsuen Wan, N.T.", area: "Tsuen Wan", lat: 22.3699, lng: 114.1180, distanceKm: 12.0, specialties: ["A&E", "Internal Medicine", "Chinese Medicine"], languages: [ {language:"Cantonese",level:"Fully Bilingual Staff"},{language:"English",level:"Basic Communication Available"},{language:"Mandarin",level:"Translation Service Available"} ], waitLow: 44.33, waitHigh: 55.21, meanWait: 50.18, confScore: 87.75, busy: [0,83,91,88,95,97,100,90,71,68,74,77,81,0,0,0,0,0,0,0,0,0,0,0] },
];

function congestionFrom(mean: number): Congestion {
  if (mean < 35) return "low";
  if (mean <= 55) return "moderate";
  return "high";
}

const PHOTO_POOL = [
  "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=800&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=800&h=400&fit=crop&auto=format",
];

export const hospitals: Hospital[] = seeds.map((s, i) => ({
  id: s.id,
  name: s.name,
  facilityType: s.facilityType,
  address: s.address,
  area: s.area,
  description: `${s.facilityType} in ${s.area}. Live A&E wait predictions from the CarePath XGBoost model (mean confidence ${s.confScore.toFixed(1)}%).`,
  distanceMiles: Math.round(s.distanceKm * 0.621371 * 10) / 10,
  specialties: s.specialties,
  departments: ["A&E", "Outpatients", "Imaging"],
  insurance: ["Hospital Authority (public)"],
  languages: s.languages,
  languagesVerifiedOn: "01 Jan 2026",
  waitCategory: "A&E Wait",
  waitLow: s.coldStart ? 0 : s.waitLow,
  waitHigh: s.coldStart ? 0 : s.waitHigh,
  congestion: congestionFrom(s.meanWait),
  confidenceScore: s.confScore,
  mapX: 50,
  mapY: 50,
  lat: s.lat,
  lng: s.lng,
  busyHours: s.busy.map((v) => Math.max(4, v)),
  reviewSummary: `XGBoost forecast midpoint ${Math.round(s.meanWait)} min. Top model signal: 3-step rolling P95 of recent A&E waits.`,
  reviewCount: 0,
  rating: 0,
  documents: ["HKID or passport", "Medical record number (if any)", "Insurance card (if applicable)"],
  arrivalInstructions: `Report to A&E triage at ${s.name}. Bring HKID and any current medications list.`,
  photo: PHOTO_POOL[i % PHOTO_POOL.length],
  predictedWaitMinutes: Math.round(s.meanWait * 10) / 10,
  uncertaintyMinutes: Math.round(((s.waitHigh - s.waitLow) / 2) * 10) / 10,
  coldStart: s.coldStart,
}));



export function getHospital(id: string): Hospital | undefined {
  return hospitals.find((h) => h.id === id);
}

export const ALL_SPECIALTIES = Array.from(
  new Set(hospitals.flatMap((h) => h.specialties)),
).sort();

export const ALL_LANGUAGES = Array.from(
  new Set(hospitals.flatMap((h) => h.languages.map((l) => l.language))),
).sort();


export function congestionLabel(c: Congestion): string {
  switch (c) {
    case "low":
      return "Low";
    case "moderate":
      return "Moderate";
    case "high":
      return "High";
  }
}

export function confidenceLabel(score: number): string {
  return `${score.toFixed(1)}%`;
}

export function shouldWarn(h: Hospital): boolean {
  if (h.coldStart) return true;
  const mid = (h.waitLow + h.waitHigh) / 2;
  return mid > 60 || h.confidenceScore < 65;
}


export type Priority = "fastest" | "closest";

export interface UserCoord {
  lat: number;
  lng: number;
}

export interface RecommendationInput {
  priority: Priority;
  preferredLanguage?: string;
  preferredSpecialty?: string;
  loadBalanceFactor?: Record<string, number>; // hospital id -> 0..1 visit-intent share
  userLocation?: UserCoord;
}

export interface Ranked {
  hospital: Hospital;
  score: number;
  rationale: string;
  distanceKm: number;
  distanceMiles: number;
}

export function haversineKm(a: UserCoord, b: UserCoord): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

export function rankHospitals(
  list: Hospital[],
  input: RecommendationInput,
): Ranked[] {
  const { priority, preferredLanguage, preferredSpecialty, loadBalanceFactor = {}, userLocation } = input;

  return list
    .map((h) => {
      const distanceKm = userLocation
        ? haversineKm(userLocation, { lat: h.lat, lng: h.lng })
        : h.distanceMiles / 0.621371;
      const distanceMiles = distanceKm * 0.621371;

      const waitMid = h.coldStart ? 60 : (h.waitLow + h.waitHigh) / 2;
      const waitScore = Math.max(0, 100 - waitMid);
      const distScore = Math.max(0, 100 - distanceMiles * 15);
      const congScore = h.congestion === "low" ? 100 : h.congestion === "moderate" ? 60 : 25;
      const specMatch =
        preferredSpecialty && h.specialties.includes(preferredSpecialty) ? 25 : 0;
      const langMatch =
        preferredLanguage &&
        h.languages.some(
          (l) =>
            l.language === preferredLanguage &&
            l.level !== "No Verified Language Support",
        )
          ? 20
          : 0;
      const loadPenalty = (loadBalanceFactor[h.id] ?? 0) * 35;

      const base =
        priority === "fastest"
          ? waitScore * 0.55 + congScore * 0.2 + distScore * 0.1
          : distScore * 0.55 + waitScore * 0.2 + congScore * 0.1;

      const score = base + specMatch + langMatch - loadPenalty;

      const reasons: string[] = [];
      if (priority === "fastest" && waitMid < 30) reasons.push("short predicted wait");
      if (priority === "closest" && distanceMiles < 1.5) reasons.push("close to you");
      if (h.congestion === "low") reasons.push("low current congestion");
      if (specMatch) reasons.push(`matches ${preferredSpecialty}`);
      if (langMatch) reasons.push(`supports ${preferredLanguage}`);
      if (loadPenalty > 10) reasons.push("alternative to over-directed sites");
      if (reasons.length === 0) reasons.push("balanced wait and travel time");

      return {
        hospital: h,
        score,
        rationale: `Recommended because: ${reasons.join(", ")}.`,
        distanceKm: Math.round(distanceKm * 10) / 10,
        distanceMiles: Math.round(distanceMiles * 10) / 10,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function formatWait(h: Hospital): string {
  if (h.coldStart) return "—";
  return `~${Math.round((h.waitLow + h.waitHigh) / 2)}`;
}


// ---------------------------------------------------------------------------
// Demo-only 24-hour hourly forecast.
//
// The XGBoost training data only covers hours 1–12, so we do NOT extrapolate
// real predictions to 13–23. This helper is used *for chart visualization
// only* and shapes the model's current predicted wait time with a fixed
// hourly demand curve plus a small deterministic per-hospital jitter so the
// same hospital always renders the same chart across refreshes.
// ---------------------------------------------------------------------------

export const HOURLY_MULTIPLIERS: Record<number, number> = {
  0: 0.65, 1: 0.55, 2: 0.5, 3: 0.45, 4: 0.45, 5: 0.5,
  6: 0.6, 7: 0.75, 8: 0.9, 9: 1.0, 10: 1.05, 11: 1.1,
  12: 1.15, 13: 1.2, 14: 1.25, 15: 1.25, 16: 1.2, 17: 1.25,
  18: 1.35, 19: 1.4, 20: 1.35, 21: 1.25, 22: 1.1, 23: 0.85,
};

// Deterministic hash → [0,1). Same hospital+hour always yields same value.
function seededJitter(seed: string, hour: number): number {
  let h = 2166136261;
  const key = `${seed}:${hour}`;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

export interface HourlyForecastPoint {
  hour: number;
  predicted_wait_time_minutes: number;
}

export interface HospitalForecast {
  hospital_name: string;
  predicted_wait_time_minutes: number;
  confidence_score: number;
  uncertainty_minutes: number;
  hourly_forecast: HourlyForecastPoint[];
}

export function generateHourlyForecast(h: Hospital): HospitalForecast {
  const base = h.predictedWaitMinutes > 0
    ? h.predictedWaitMinutes
    : (h.waitLow + h.waitHigh) / 2 || 30;

  const hourly_forecast: HourlyForecastPoint[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const mult = HOURLY_MULTIPLIERS[hour] ?? 1;
    // ±6% deterministic wiggle so bars aren't perfectly smooth
    const jitter = (seededJitter(h.id, hour) - 0.5) * 0.12;
    const value = base * mult * (1 + jitter);
    hourly_forecast.push({
      hour,
      predicted_wait_time_minutes: Math.max(1, Math.round(value)),
    });
  }

  return {
    hospital_name: h.name,
    predicted_wait_time_minutes: Math.round(base * 10) / 10,
    confidence_score: Math.round(h.confidenceScore * 10) / 10,
    uncertainty_minutes: h.uncertaintyMinutes,
    hourly_forecast,
  };
}

