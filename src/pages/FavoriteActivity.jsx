import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import FavoritePicture from '../components/FavoritePicture'
import PageHeader from '../components/PageHeader'
import { favoriteLearningActivities } from '../data/content'
import { useAppState } from '../hooks/useAppState'

const paintColours = ['#ef476f', '#ffd166', '#06d6a0', '#38bdf8']
const blockColours = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#8b5cf6']

function useFinish(activity, awardStars) {
  const [completed, setCompleted] = useState(false)

  return {
    completed,
    finish: () => {
      if (completed) return
      setCompleted(true)
      awardStars(1, `${activity.title} activity finished.`)
    },
  }
}

function Feedback({ text, bridge, finish }) {
  return (
    <div className="favorite-feedback" role="status">
      <p className="leading-7 text-slate-700">{text}</p>
      <p className="mt-3 rounded-lg bg-sky-50 p-3 text-sm font-bold leading-6 text-slate-700">
        Away from the screen: {bridge}
      </p>
      <button type="button" className="btn-primary mt-4 w-full" onClick={finish}>
        I did it
      </button>
    </div>
  )
}

function FairyGardenMini({ activity, finish }) {
  const [care, setCare] = useState([])
  const addCare = (item) => setCare((current) => [...new Set([...current, item])])
  const height = 38 + care.length * 18

  return (
    <>
      <div className="mini-scene fairy-mini">
        <span className="mini-flower" style={{ height: `${height}px` }} />
        <span className="mini-sun" />
        {care.includes('Kind words') ? <span className="mini-sparkles" /> : null}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {activity.choices.map((choice) => (
          <button key={choice.label} type="button" className="choice-chip" onClick={() => addCare(choice.label)}>
            {choice.label}
          </button>
        ))}
      </div>
      {care.length ? (
        <Feedback
          text={`The flower has ${care.join(', ').toLowerCase()}. You are noticing what living things need.`}
          bridge={activity.bridge}
          finish={finish}
        />
      ) : null}
    </>
  )
}

function FarmOrderMini({ activity, finish }) {
  const order = ['Plant seeds', 'Water crops', 'Harvest food']
  const [steps, setSteps] = useState([])
  const next = order[steps.length]
  const addStep = (label) => {
    if (label === next) setSteps((current) => [...current, label])
  }

  return (
    <>
      <div className="mini-sequence">
        {order.map((step, index) => (
          <div key={step} className={steps.includes(step) ? 'done' : ''}>
            <span>{index + 1}</span>
            {steps[index] || '...'}
          </div>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {order.map((step) => (
          <button key={step} type="button" className="choice-chip" disabled={steps.includes(step)} onClick={() => addStep(step)}>
            {step}
          </button>
        ))}
      </div>
      {steps.length === order.length ? (
        <Feedback text="First seeds, next water, last harvest. That is careful farm sequencing." bridge={activity.bridge} finish={finish} />
      ) : (
        <p className="favorite-feedback quiet">Next job: {next}</p>
      )}
    </>
  )
}

function EmotionStoryMini({ activity, finish, character = 'friend' }) {
  const [feeling, setFeeling] = useState('')
  const [helper, setHelper] = useState('')
  const helpers = ['gentle voice', 'quiet cuddle', 'brave try']

  return (
    <>
      <div className="mini-character-card">
        <FavoritePicture kind={activity.kind} title={activity.title} />
        <p>{feeling ? `The ${character} feels ${feeling.toLowerCase()}.` : `How does the ${character} feel?`}</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {activity.choices.map((choice) => (
          <button key={choice.label} type="button" className={`choice-chip ${feeling === choice.label ? 'selected' : ''}`} onClick={() => setFeeling(choice.label)}>
            {choice.label}
          </button>
        ))}
      </div>
      {feeling ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {helpers.map((item) => (
            <button key={item} type="button" className={`choice-chip ${helper === item ? 'selected' : ''}`} onClick={() => setHelper(item)}>
              {item}
            </button>
          ))}
        </div>
      ) : null}
      {feeling && helper ? (
        <Feedback text={`Story: the ${character} felt ${feeling.toLowerCase()}, then found a ${helper}.`} bridge={activity.bridge} finish={finish} />
      ) : null}
    </>
  )
}

function PuppyActionMini({ activity, finish }) {
  const [actions, setActions] = useState([])
  const addAction = (label) => setActions((current) => [...current, label].slice(-3))

  return (
    <>
      <div className="mini-puppy-yard">
        <FavoritePicture kind="puppy" title="Puppy" />
        <div className="mini-action-strip">{actions.length ? actions.join(' -> ') : 'Teach the puppy a calm pattern.'}</div>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {activity.choices.map((choice) => (
          <button key={choice.label} type="button" className="choice-chip" onClick={() => addAction(choice.label)}>
            {choice.label}
          </button>
        ))}
      </div>
      {actions.length >= 3 ? (
        <Feedback text={`The puppy learned a three-action pattern: ${actions.join(', ').toLowerCase()}.`} bridge={activity.bridge} finish={finish} />
      ) : null}
    </>
  )
}

function PositionMini({ activity, finish }) {
  const [place, setPlace] = useState('')
  const className = place ? `position-${place.split(' ')[0].toLowerCase()}` : ''

  return (
    <>
      <div className="mini-position-world">
        <span className="mini-shell" />
        <span className={`mini-voyager ${className}`} />
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {activity.choices.map((choice) => (
          <button key={choice.label} type="button" className={`choice-chip ${place === choice.label ? 'selected' : ''}`} onClick={() => setPlace(choice.label)}>
            {choice.label}
          </button>
        ))}
      </div>
      {place ? <Feedback text={`You moved her ${place.toLowerCase()}. That is position language.`} bridge={activity.bridge} finish={finish} /> : null}
    </>
  )
}

function SortMini({ activity, finish, bins }) {
  const [sorted, setSorted] = useState({})
  const choices = activity.choices.map((choice, index) => ({ ...choice, bin: bins[index % bins.length] }))

  return (
    <>
      <div className="mini-bin-row">
        {bins.map((bin) => (
          <div key={bin} className="mini-bin">{bin}</div>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {choices.map((choice) => (
          <button
            key={choice.label}
            type="button"
            className={`choice-chip ${sorted[choice.label] ? 'selected' : ''}`}
            onClick={() => setSorted((current) => ({ ...current, [choice.label]: choice.bin }))}
          >
            {choice.label} {'>'} {choice.bin}
          </button>
        ))}
      </div>
      {Object.keys(sorted).length === choices.length ? (
        <Feedback text="Everything has a group. Sorting helps us notice how things belong." bridge={activity.bridge} finish={finish} />
      ) : null}
    </>
  )
}

function StoryBuilderMini({ activity, finish }) {
  const [story, setStory] = useState([])
  const add = (label) => setStory((current) => [...current, label].slice(0, 3))

  return (
    <>
      <div className="mini-story-path">
        {['First', 'Next', 'Last'].map((label, index) => (
          <div key={label}>
            <strong>{label}</strong>
            <span>{story[index] || 'choose'}</span>
          </div>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {activity.choices.map((choice) => (
          <button key={choice.label} type="button" className="choice-chip" disabled={story.includes(choice.label)} onClick={() => add(choice.label)}>
            {choice.label}
          </button>
        ))}
      </div>
      {story.length === 3 ? <Feedback text={`Your story has a beginning, middle, and ending: ${story.join(', ')}.`} bridge={activity.bridge} finish={finish} /> : null}
    </>
  )
}

function SoundMini({ activity, finish }) {
  const [sounds, setSounds] = useState([])
  const add = (label) => setSounds((current) => [...current, label].slice(-4))

  return (
    <>
      <div className="mini-sound-water">
        {sounds.map((sound, index) => <span key={`${sound}-${index}`}>{sound}</span>)}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {activity.choices.map((choice) => (
          <button key={choice.label} type="button" className="choice-chip" onClick={() => add(choice.label)}>
            {choice.label}
          </button>
        ))}
      </div>
      {sounds.length >= 3 ? <Feedback text={`You made an ocean sound pattern: ${sounds.join(', ')}.`} bridge={activity.bridge} finish={finish} /> : null}
    </>
  )
}

function PatternMini({ activity, finish }) {
  const patterns = [
    ['Dot', 'Dot', 'Stripe', 'Dot', 'Dot', '?'],
    ['Red', 'Blue', 'Red', 'Blue', 'Red', '?'],
    ['Big', 'Little', 'Big', 'Little', 'Big', '?'],
  ]
  const [patternIndex, setPatternIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const pattern = patterns[patternIndex]
  const correct = patternIndex === 0 ? 'Stripe' : patternIndex === 1 ? 'Blue' : 'Little'

  return (
    <>
      <div className="mini-pattern-row">
        {pattern.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {['Stripe', 'Blue', 'Little'].map((item) => (
          <button key={item} type="button" className={`choice-chip ${answer === item ? 'selected' : ''}`} onClick={() => setAnswer(item)}>
            {item}
          </button>
        ))}
      </div>
      {answer === correct ? <Feedback text="You found what comes next in the pattern." bridge={activity.bridge} finish={finish} /> : null}
      <button type="button" className="btn-secondary mt-3 w-full" onClick={() => { setPatternIndex((current) => (current + 1) % patterns.length); setAnswer('') }}>
        New pattern
      </button>
    </>
  )
}

function ColouringMini({ activity, finish }) {
  const [colour, setColour] = useState(paintColours[0])
  const [cells, setCells] = useState(Array.from({ length: 16 }, () => ''))

  return (
    <>
      <div className="mini-paint-grid">
        {cells.map((cell, index) => (
          <button key={index} type="button" style={{ background: cell || '#fff' }} onClick={() => setCells((current) => current.map((item, i) => i === index ? colour : item))} aria-label={`Paint cell ${index + 1}`} />
        ))}
      </div>
      <div className="mini-colour-row">
        {paintColours.map((item) => (
          <button key={item} type="button" style={{ background: item }} className={colour === item ? 'selected' : ''} onClick={() => setColour(item)} aria-label={`Choose ${item}`} />
        ))}
      </div>
      {cells.filter(Boolean).length >= 6 ? <Feedback text="You planned colours and filled part of your picture." bridge={activity.bridge} finish={finish} /> : null}
    </>
  )
}

function MovementMini({ activity, finish, target }) {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="mini-movement-counter">
        <span>{count}</span>
        <p>{count >= target ? 'Finished' : `Try for ${target}`}</p>
      </div>
      <button type="button" className="btn-primary w-full" onClick={() => setCount((current) => Math.min(target, current + 1))}>
        Count one movement
      </button>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {activity.choices.map((choice) => <span key={choice.label} className="mini-prompt-chip">{choice.label}</span>)}
      </div>
      {count >= target ? <Feedback text="You counted your body movement and stopped on purpose." bridge={activity.bridge} finish={finish} /> : null}
    </>
  )
}

function DressUpStoryMini({ activity, finish }) {
  const [role, setRole] = useState('')
  const [place, setPlace] = useState('')
  const places = ['garden', 'library', 'castle']

  return (
    <>
      <div className="mini-story-path">
        <div><strong>Role</strong><span>{role || 'choose'}</span></div>
        <div><strong>Place</strong><span>{place || 'choose'}</span></div>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {activity.choices.map((choice) => <button key={choice.label} type="button" className={`choice-chip ${role === choice.label ? 'selected' : ''}`} onClick={() => setRole(choice.label)}>{choice.label}</button>)}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {places.map((item) => <button key={item} type="button" className={`choice-chip ${place === item ? 'selected' : ''}`} onClick={() => setPlace(item)}>{item}</button>)}
      </div>
      {role && place ? <Feedback text={`The ${role.toLowerCase()} goes to the ${place} and makes a kind choice.`} bridge={activity.bridge} finish={finish} /> : null}
      <Link to="/princess-dress-up" className="btn-secondary mt-3 w-full">Open full dress-up</Link>
    </>
  )
}

function WandMini({ activity, finish }) {
  const [words, setWords] = useState([])
  const add = (label) => setWords((current) => current.includes(label) ? current : [...current, label])

  return (
    <>
      <div className="mini-wand-spell">
        {words.length ? words.join(' + ') : 'Build a kind spell'}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {activity.choices.map((choice) => <button key={choice.label} type="button" className={`choice-chip ${words.includes(choice.label) ? 'selected' : ''}`} onClick={() => add(choice.label)}>{choice.label}</button>)}
      </div>
      {words.length >= 2 ? <Feedback text={`Your wand spell is ${words.join(' and ').toLowerCase()}.`} bridge={activity.bridge} finish={finish} /> : null}
    </>
  )
}

function PuzzleMini({ activity, finish }) {
  const [matches, setMatches] = useState({})
  const pairs = [['Heart', 'Heart'], ['Star', 'Star'], ['Moon', 'Moon']]

  return (
    <>
      <div className="mini-puzzle-grid">
        {pairs.flatMap((pair, index) => pair.map((label, side) => (
          <button key={`${label}-${index}-${side}`} type="button" className={matches[index] ? 'matched' : ''} onClick={() => setMatches((current) => ({ ...current, [index]: true }))}>
            {label}
          </button>
        )))}
      </div>
      {Object.keys(matches).length === pairs.length ? <Feedback text="You matched the pieces by looking carefully." bridge={activity.bridge} finish={finish} /> : <p className="favorite-feedback quiet">Tap matching picture words.</p>}
    </>
  )
}

function BlocksMini({ activity, finish }) {
  const [blocks, setBlocks] = useState([])
  const add = () => setBlocks((current) => [...current, blockColours[current.length % blockColours.length]].slice(0, 8))

  return (
    <>
      <div className="mini-block-stack">
        {blocks.map((colour, index) => <span key={`${colour}-${index}`} style={{ background: colour }} />)}
      </div>
      <button type="button" className="btn-primary w-full" onClick={add} disabled={blocks.length >= 8}>
        Add block
      </button>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {activity.choices.map((choice) => <span key={choice.label} className="mini-prompt-chip">{choice.label}</span>)}
      </div>
      {blocks.length >= 5 ? <Feedback text="Your tower uses height, balance, and colour." bridge={activity.bridge} finish={finish} /> : null}
    </>
  )
}

function ActivityPlay({ activity, finish }) {
  switch (activity.id) {
    case 'fairy':
      return <FairyGardenMini activity={activity} finish={finish} />
    case 'farm':
      return <FarmOrderMini activity={activity} finish={finish} />
    case 'piglet':
      return <EmotionStoryMini activity={activity} finish={finish} character="piglet" />
    case 'puppy':
      return <PuppyActionMini activity={activity} finish={finish} />
    case 'ocean-princess':
      return <PositionMini activity={activity} finish={finish} />
    case 'ice-sisters':
      return <SortMini activity={activity} finish={finish} bins={['warm', 'cold', 'kind']} />
    case 'book-princess':
      return <StoryBuilderMini activity={activity} finish={finish} />
    case 'mermaid':
      return <SoundMini activity={activity} finish={finish} />
    case 'mouse-friend':
      return <PatternMini activity={activity} finish={finish} />
    case 'sorting-truck':
      return <SortMini activity={activity} finish={finish} bins={['recycling', 'compost', 'rubbish']} />
    case 'colouring':
      return <ColouringMini activity={activity} finish={finish} />
    case 'swing':
      return <MovementMini activity={activity} finish={finish} target={3} />
    case 'trampoline':
      return <MovementMini activity={activity} finish={finish} target={5} />
    case 'dress-up':
      return <DressUpStoryMini activity={activity} finish={finish} />
    case 'wand':
      return <WandMini activity={activity} finish={finish} />
    case 'puzzle':
      return <PuzzleMini activity={activity} finish={finish} />
    case 'blocks':
      return <BlocksMini activity={activity} finish={finish} />
    default:
      return <StoryBuilderMini activity={activity} finish={finish} />
  }
}

export default function FavoriteActivity() {
  const { id } = useParams()
  const { awardStars, settings } = useAppState()
  const activity = favoriteLearningActivities.find((item) => item.id === id)
  const isParentMode = settings.audienceMode === 'parent'
  const completion = useFinish(activity || { title: 'Favorite' }, awardStars)

  if (!activity) {
    return <Navigate to="/" replace />
  }

  return (
    <div>
      <PageHeader title={activity.title} eyebrow="Things Sylvie loves">
        <p>{activity.invitation}</p>
      </PageHeader>

      <section className="favorite-activity-layout">
        <div className="favorite-activity-picture">
          <FavoritePicture kind={activity.kind} title={activity.title} />
        </div>

        <div className="favorite-activity-panel">
          <ActivityPlay activity={activity} finish={completion.finish} />

          {completion.completed ? (
            <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm font-black text-emerald-800">
              Finished. You can try another card or go make it in real life.
            </p>
          ) : null}

          {isParentMode ? (
            <details className="mt-4 rounded-lg bg-white/80 px-3 py-2 text-sm text-slate-600">
              <summary className="cursor-pointer font-black text-slate-800">
                Grown-up note
              </summary>
              <p className="mt-2 leading-6">
                <strong>Focus:</strong> {activity.focus}
              </p>
              <p className="mt-2 leading-6">
                <strong>EYLF:</strong> {activity.eylf}
              </p>
              <p className="mt-2 leading-6">
                <strong>Try:</strong> {activity.parentCue}
              </p>
            </details>
          ) : null}

          <Link to="/" className="btn-secondary mt-4 w-full">
            Back to pictures
          </Link>
        </div>
      </section>
    </div>
  )
}
