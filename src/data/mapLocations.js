import { logos } from './logos.js'

// Coordinates + display city for each real logo institution (matched by name).
// Keeping this separate from logos.js means the logo carousel stays purely
// about the images, and the map stays purely about geography — but both trace
// back to the same underlying list of real partners.
//
// NOTE: these are plain real-world latitude/longitude values. CollaborationMap
// projects them with the exact same equirectangular formula it uses to draw the
// real Natural Earth coastlines, so every pin lands on the correct spot on the
// map with no manual pixel nudging. (The old map traced a stylized reference
// image and needed per-pin `screenOverride` offsets to compensate; that whole
// mechanism is gone now that the basemap is geographically accurate.)
const COORDS = {
  'University of Toronto': { lat: 43.66, lng: -79.4, place: 'Toronto, Canada' },
  'University of Wollongong Australia': { lat: -34.41, lng: 150.88, place: 'Wollongong, Australia' },
  'Stanford School of Medicine': { lat: 37.43, lng: -122.17, place: 'Stanford, USA' },
  'Rutgers, The State University of New Jersey': { lat: 40.5, lng: -74.45, place: 'New Brunswick, USA' },
  'Massachusetts Institute of Technology': { lat: 42.36, lng: -71.09, place: 'Cambridge, USA' },
  'McMaster University': { lat: 43.26, lng: -79.92, place: 'Hamilton, Canada' },
  'Mayo Clinic': { lat: 44.02, lng: -92.47, place: 'Rochester, USA' },
  'Mass General Brigham': { lat: 42.34, lng: -71.07, place: 'Boston, USA' },
  'Johns Hopkins University': { lat: 39.33, lng: -76.62, place: 'Baltimore, USA' },
  'Harvard Medical School': { lat: 42.38, lng: -71.12, place: 'Cambridge, USA' },
  'Duke University': { lat: 36.0, lng: -78.94, place: 'Durham, USA' },
  CAMH: { lat: 43.65, lng: -79.42, place: 'Toronto, Canada' },
  'University of Cambridge': { lat: 52.2, lng: 0.12, place: 'Cambridge, UK' },
  'Icahn School of Medicine at Mount Sinai': { lat: 40.79, lng: -73.95, place: 'New York, USA' },
  'UC Berkeley': { lat: 37.87, lng: -122.27, place: 'Berkeley, USA' },
  'Rice University': { lat: 29.72, lng: -95.4, place: 'Houston, USA' },
  "Queen's University Belfast": { lat: 54.58, lng: -5.93, place: 'Belfast, UK' },
}

// A few institutions in COORDS above are logo'd but represent something other
// than a generic collaborator (e.g. a team member's home institution) — override
// the default 'Collaborator' tag for those by name.
const TAG_OVERRIDES = {
  'Rice University': 'Team',
}

// Every partner/collaborator institution shown in the logo carousel, geocoded.
const fromLogos = logos
  .filter((logo) => COORDS[logo.name])
  .map((logo) => ({
    name: logo.name,
    tag: TAG_OVERRIDES[logo.name] || 'Collaborator',
    ...COORDS[logo.name],
  }))

// Team members' home institutions not already covered by a logo above.
const fromTeam = []

// Where our published research is based/focused, when it isn't already an
// institution pin above.
const fromPublications = [
  { name: "Sri Lanka's National ACS Registry", tag: 'Featured Publication', lat: 7.87, lng: 80.77, place: 'Sri Lanka' },
]

// Additional locations shown on the map without being tied to a specific
// logo/team/publication record.
const additional = [
  { name: 'Senegal', tag: 'Collaborator', lat: 14.72, lng: -17.47, place: 'Dakar, Senegal' },
  { name: 'Colombia', tag: 'Collaborator', lat: 4.71, lng: -74.07, place: 'Bogotá, Colombia' },
  // Kept here (not in COORDS/logos.js) so it still shows on the map even though
  // its mark was removed from the logo carousel.
  { name: 'Telangana Chapter of the Cardiological Society of India', tag: 'Collaborator', lat: 17.38, lng: 78.49, place: 'Hyderabad, India' },
]

// De-duplicate by name in case a place appears in more than one source.
const seen = new Set()
export const mapLocations = [...fromLogos, ...fromTeam, ...fromPublications, ...additional].filter((loc) => {
  if (seen.has(loc.name)) return false
  seen.add(loc.name)
  return true
})
