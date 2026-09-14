import DisciplinePage from '../components/DisciplinePage'

import robloxLogo from '../assets/Roblox_Logo_2025.png'

import ajaccio1 from '../assets/building/Ajaccio1.png'
import ajaccio2 from '../assets/building/Ajaccio2.png'
import bud1 from '../assets/building/BUD1.png'
import bud2 from '../assets/building/BUD2.png'
import bud3 from '../assets/building/BUD3.png'
import bud4 from '../assets/building/BUD4.png'
import bud5 from '../assets/building/BUD5.png'
import dbv1 from '../assets/building/DBV1.png'
import dbv2 from '../assets/building/DBV2.png'
import egnt1 from '../assets/building/EGNT1.png'
import egnt2 from '../assets/building/EGNT2.png'
import egnt3 from '../assets/building/EGNT3.png'
import kchs1 from '../assets/building/KCHS1.png'
import kchs2 from '../assets/building/KCHS2.png'
import kchs3 from '../assets/building/KCHS3.png'
import kchs4 from '../assets/building/KCHS4.png'
import kchs5 from '../assets/building/KCHS5.png'
import kuusamo1 from '../assets/building/KUUSAMO1.png'
import kuusamo2 from '../assets/building/KUUSAMO2.png'
import kuusamo3 from '../assets/building/KUUSAMO3.png'
import normandy1 from '../assets/building/Normady1.png'
import timisoara from '../assets/building/Timisoara.png'
import timisoara1 from '../assets/building/Timisoara1.png'
import timisoara2 from '../assets/building/Timisoara2.png'
import timisoara4 from '../assets/building/Timisoara4.png'

const tools = [{ name: 'Roblox Studio', logo: robloxLogo }]

const projects = [
  {
    name: 'Budapest Airport (LHBP)',
    date: 'December 2021',
    details: 'Recreation of Budapest Ferenc Liszt International Airport terminal and airfield for my tech group Lufts Airport Shack.',
    images: [bud1, bud2, bud3, bud4, bud5],
  },
  {
    name: 'Charleston Airport (KCHS)',
    date: 'April 2024',
    details: 'Charleston International Airport with terminal buildings and surrounding infrastructure. Developed for Lufts Airport Shack',
    images: [kchs1, kchs2, kchs3, kchs4, kchs5],
  },
  {
    name: 'Kuusamo Airport (EFKS)',
    date: 'January 2022',
    details: 'Finnish regional airport set in a snowy landscape environment. This project was a duo with my friend.',
    images: [kuusamo1, kuusamo2, kuusamo3],
  },
  {
    name: 'Newcastle Airport (EGNT)',
    date: 'January 2023',
    details: 'Newcastle International Airport terminal and apron area. This product has been purchased by TUI roblox who have amended it to their liking and are the only users of this airport.',
    images: [egnt1, egnt2, egnt3],
  },
  {
    name: 'Ajaccio Airport',
    date: 'December 2023',
    details: 'Corsican airport with Mediterranean coastal scenery.',
    images: [ajaccio1, ajaccio2],
  },
  {
    name: 'Dubrovnik Airport (DBV)',
    date: 'July 2025',
    details: 'Croatian coastal airport with scenic Adriatic surroundings.',
    images: [dbv1, dbv2],
  },
  {
    name: 'Timisoara Airport (LRTR)',
    date: 'June 2022',
    details: 'Romanian regional airport terminal and airfield recreation. This product was privatley commisioned.',
    images: [timisoara, timisoara1, timisoara2, timisoara4],
  },
  {
    name: 'Normandy Houses',
    date: 'September 2025',
    details: 'WWII Normandy-inspired buildings for an environment build.',
    images: [normandy1],
  },
]

export default function Building() {
  return (
    <DisciplinePage
      tag="BUILDING"
      title="Building"
      subtitle="Immersive environments and structures crafted in Roblox Studio"
      tools={tools}
      projects={projects}
      activePage="building"
    />
  )
}
