import { Link } from 'react-router-dom'
import BigButton from '../components/BigButton'
import StarCounter from '../components/StarCounter'

const sections = [
  { to: '/fairy-garden', icon: '🌸', title: 'Fairy Garden', description: 'Bloom flowers, sparkle with fairies, and collect stars.' },
  { to: '/farm-adventure', icon: '🐄', title: 'Farm Adventure', description: 'Plant seeds, water crops, harvest fruit, and feed gentle animals.' },
  { to: '/dress-up', icon: '👗', title: 'Princess Dress-Up', description: 'Create dreamy outfits with crowns, capes, and sparkles.' },
  { to: '/colouring', icon: '🎨', title: 'Colouring Room', description: 'Paint happy pages with big colours and save your drawings.' },
  { to: '/puzzle-play', icon: '🧩', title: 'Puzzle Play', description: 'Enjoy shape matching, colour games and clever picture puzzles.' },
  { to: '/block-builder', icon: '🧱', title: 'Block Builder', description: 'Build gentle towers and save your favourite creations.' },
  { to: '/trash-sorter', icon: '🚛', title: 'Trash Truck Sorter', description: 'Sort items into recycling, compost, and rubbish bins.' },
  { to: '/break-time', icon: '🌈', title: 'Trampoline & Swing', description: 'Take a calm movement break with playful prompts.' },
  { to: '/story-corner', icon: '📖', title: 'Story Corner', description: 'Read short interactive stories with kind choices.' },
  { to: '/parent-settings', icon: '🔒', title: 'Parent Settings', description: 'Manage settings, reset progress, and add custom messages.' },
]

export default function HomePage({ stars }) {
  return (
    <main className="space-y-6 pb-10">
      <section className="rounded-[2rem] border border-white/70 bg-gradient-to-br from-pastel-pink via-white to-pastel-blue p-6 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Welcome to</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 sm:text-5xl">SylvieApp</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              A gentle magical play world for Sylvie with kind games, calm activities, and sweet rewards.
            </p>
          </div>
          <StarCounter stars={stars} />
        </div>
      </section>

      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <BigButton key={section.to} {...section} />
          ))}
        </div>
      </section>
    </main>
  )
}
