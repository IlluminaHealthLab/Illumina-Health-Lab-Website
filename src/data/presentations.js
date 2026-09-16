import hfPosterPreview from '../assets/posters/hf-poster-2026.jpg'
import hfPosterFull from '../assets/posters/hf-poster-2026-full.jpg'

// Conference presentations and accepted posters. These are a distinct kind of
// research output from journal articles (which live in publications.js): they
// are inherently visual, so each entry carries a poster image used both as the
// card preview and in the full-screen lightbox, plus the original PDF for
// download. `full` is a larger render for zooming; `preview` is a lighter copy
// for the card.
export const presentations = [
  {
    id: 'hf-geographic-gradient-2026',
    title:
      'The Geographic Gradient of Cardiometabolic Organ Failure: Heart Failure Mortality in the United States, 1999–2020',
    type: 'Poster Presentation',
    status: 'Accepted',
    venue: 'McMaster Research Conference 2026',
    authors: 'Imeth Illamperuma, Perisa Ashar & Luke Mathew',
    affiliations:
      'McMaster University Department of Medicine · Duke University Department of Biomedical Engineering',
    summary:
      'A serial cross-sectional analysis of CDC WONDER mortality data (1999–2020) mapping how heart failure mortality — a marker of cumulative cardiometabolic injury — varies by sex, race/ethnicity, geography, and urbanization, with the highest burden concentrated across the rural Southeast and Appalachia.',
    preview: hfPosterPreview,
    full: hfPosterFull,
    pdf: '/posters/hf-poster-2026.pdf',
  },
]
