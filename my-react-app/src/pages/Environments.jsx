import DisciplinePage from '../components/DisciplinePage'

import robloxLogo from '../assets/Roblox_Logo_2025.png'

import carentan1 from '../assets/environments/Carentan1.png'
import carentan2 from '../assets/environments/Carentan2.png'
import carentan3 from '../assets/environments/Careantan3.png'
import mogadishu1 from '../assets/environments/Mogadishu1.png'
import mogadishu2 from '../assets/environments/Mogadishu2.png'
import mogadishu3 from '../assets/environments/Mogadishu3.png'
import mogadishu4 from '../assets/environments/Mogadishu4.png'
import mogadishu5 from '../assets/environments/Mogadishu5.png'
import rhine1 from '../assets/environments/Rhine1.png'
import rhine2 from '../assets/environments/Rhine2.png'
import rhine3 from '../assets/environments/Rhine3.png'
import rhine4 from '../assets/environments/Rhine4.png'
import spratly1 from '../assets/environments/Spratly1.png'
import spratly2 from '../assets/environments/Spratly2.png'
import spratly3 from '../assets/environments/Spratly3.png'
import taranfo1 from '../assets/environments/Taranfo1.png'
import taranfo2 from '../assets/environments/Taranfo2.png'

const tools = [{ name: 'Roblox Studio', logo: robloxLogo }]

const projects = [
  {
    name: 'Mogadishu',
    date: '2024',
    details: 'Urban environment inspired by the streets of Mogadishu, Somalia.',
    images: [mogadishu1, mogadishu2, mogadishu3, mogadishu4, mogadishu5],
  },
  {
    name: 'Rhine Crossing',
    date: '2024',
    details: 'WWII Rhine River crossing environment with European terrain.',
    images: [rhine1, rhine2, rhine3, rhine4],
  },
  {
    name: 'Carentan',
    date: '2024',
    details: 'WWII Normandy town environment based on the Battle of Carentan.',
    images: [carentan1, carentan2, carentan3],
  },
  {
    name: 'Spratly Islands',
    date: '2024',
    details: 'Tropical island chain environment with coastal and naval scenery.',
    images: [spratly1, spratly2, spratly3],
  },
  {
    name: 'Taranfo',
    date: '2024',
    details: 'Environment build with detailed terrain and landscape work.',
    images: [taranfo1, taranfo2],
  },
]

export default function Environments() {
  return (
    <DisciplinePage
      tag="ENVIRONMENTS"
      title="Environment Design"
      subtitle="Terrain, lighting, and atmosphere design for immersive Roblox worlds"
      tools={tools}
      projects={projects}
      activePage="environments"
    />
  )
}
