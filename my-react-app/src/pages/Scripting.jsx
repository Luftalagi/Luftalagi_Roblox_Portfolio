import DisciplinePage from '../components/DisciplinePage'

import luauLogo from '../assets/Luau_Logo.png'

import sonar from '../assets/scripting/BlackWake Sonar.mov'
import torpedoHit from '../assets/scripting/Blackwake TorpedoHit.mov'
import landing from '../assets/scripting/ShortFinalLanding.mov'
import taxiing from '../assets/scripting/ShortFinalTaxxing.mov'

const tools = [{ name: 'Luau', logo: luauLogo }]

const projects = [
  {
    name: 'Gun System',
    date: '2024',
    details: 'Custom firearms framework with recoil, spread, hit detection. This is created with some basic animations and alot of the recoil math is delegated to the spring module library.',
    embeds: [
      'https://medal.tv/clip/kjoUjtGoHePQm5Ig3',
    ],
  },
  {
    name: 'WW2 Maritime System',
    date: '2024',
    details: 'Naval combat systems for my project, Black Wake including active and passive sonar detection with real-time ping visualization and physics-based torpedo impact and damage. I developed an NPC Uboat that has states and reacts to player movement and offensive actions.',
    videos: [sonar, torpedoHit],
  },
  {
    name: "Can't Catch Me",
    date: '2024',
    details: 'A runner game I developed as pratice. The clips include a chest system where the player recives an item against weighted randomness.',
    embeds: [
      'https://medal.tv/clip/lOBhtnHPxt06SpYCB',
      'https://medal.tv/clip/lO0Hj2t0dbYxbpL55',
    ],
  },
  {
    name: 'Air Traffic Control System',
    date: 'March 2025',
    details: 'Flight psuedo physics my project, Short Final with realistic approach handling. Aircraft movement happened with bezier curves and linear interpolation. I developed a state machine to manage aircraft conditions and an OOP class system for sub systems involved.',
    videos: [landing, taxiing],
  },
]

export default function Scripting() {
  return (
    <DisciplinePage
      tag="SCRIPTING"
      title="Scripting"
      subtitle="Luau systems and gameplay logic for Roblox experiences"
      tools={tools}
      projects={projects}
      activePage="scripting"
    />
  )
}
