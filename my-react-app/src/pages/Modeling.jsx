import DisciplinePage from '../components/DisciplinePage'

import blenderLogo from '../assets/BlenderLogo.webp'

import blade1 from '../assets/modeling/Blade1.png'
import blenhiem1 from '../assets/modeling/Blenhiem1.png'
import blenhiem2 from '../assets/modeling/Blenhiem2.png'
import corvette1 from '../assets/modeling/FlowerClassCorvete1.png'
import rover1 from '../assets/modeling/Rover1.png'
import rover2 from '../assets/modeling/Rover2.png'
import saab1 from '../assets/modeling/Saab3401.png'
import saab2 from '../assets/modeling/Saab3402.png'
import spacecraft1 from '../assets/modeling/Spacecraft1.png'
import tanker1 from '../assets/modeling/Tanker1.png'

const tools = [{ name: 'Blender', logo: blenderLogo }]

const projects = [
  {
    name: 'Saab 340',
    date: 'May 2026',
    details: 'Regional turboprop aircraft with detailed exterior modeling.',
    images: [saab1, saab2],
  },
  {
    name: 'Bristol Blenheim',
    date: 'May 2024',
    details: 'WWII-era light bomber engine that is an replica of the real airframe geometry.',
    images: [blenhiem1, blenhiem2],
  },
  {
    name: 'Sci-fi Armored Personel Carrier',
    date: 'August 2022',
    details: 'Developed for a sci-fi military group based off of replica images.',
    images: [rover1, rover2],
  },
  {
    name: 'Flower-Class Corvette',
    date: 'September 2024',
    details: 'WWII British naval escort vessel modeled for a naval combat experience.',
    images: [corvette1],
  },
  {
    name: 'TV-2 Held Spacecraft',
    date: 'April 2023',
    details: 'Sci-fi spacecraft designed for pratice. Blended the tie fighter design with current day aircraft design.',
    images: [spacecraft1],
  },
  {
    name: 'Kitchen Knife',
    date: 'Feburary 2023',
    details: 'Relicated my home kitchen knife for texture pratice.',
    images: [blade1],
  },
  {
    name: 'WWII Tanker',
    date: 'May 2026',
    details: 'WWII Industrial tanker vehicle for a technology demo which can be seen in the scripting section.',
    images: [tanker1],
  },
]
export default function Modeling() {
  return (
    <DisciplinePage
      tag="MODELING"
      title="3D Modeling"
      subtitle="Custom meshes and assets built for Roblox experiences"
      tools={tools}
      projects={projects}
      activePage="modeling"
    />
  )
}
