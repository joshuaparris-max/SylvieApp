import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { stories } from '../data/stories'
import { useAppState } from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'

const defaultStoryState = {
  completed: [],
}

export default function StoryCorner() {
  const { settings, awardStars } = useAppState()
  const [storyState, setStoryState] = useLocalStorage(
    STORAGE_KEYS.stories,
    defaultStoryState,
  )
  const [storyId, setStoryId] = useState(stories[0].id)
  const [nodeId, setNodeId] = useState('start')

  const story = stories.find((item) => item.id === storyId) || stories[0]
  const node = story.nodes[nodeId] || story.nodes.start

  const customPrompts = useMemo(
    () => settings.customStoryPrompts || [],
    [settings.customStoryPrompts],
  )

  const chooseStory = (id) => {
    setStoryId(id)
    setNodeId('start')
  }

  const finishStory = () => {
    if (!storyState.completed.includes(story.id)) {
      setStoryState((current) => ({
        ...current,
        completed: [...current.completed, story.id],
      }))
      awardStars(1, 'Story finished with kindness.')
    }
    setNodeId('start')
  }

  const completeCustomPrompt = (prompt) => {
    const id = `custom:${prompt}`
    if (storyState.completed.includes(id)) return
    setStoryState((current) => ({
      ...current,
      completed: [...current.completed, id],
    }))
    awardStars(1, 'Custom story shared.')
  }

  return (
    <div>
      <PageHeader title="Story Corner" eyebrow="Gentle choices">
        <p>Short original stories with fairies, farms, princesses, and calm kind endings.</p>
      </PageHeader>

      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
          <h2 className="panel-title">Stories</h2>
          <div className="grid gap-2">
            {stories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`choice-chip ${story.id === item.id ? 'selected' : ''}`}
                onClick={() => chooseStory(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        <article className="story-card">
          <h2 className="text-2xl font-black text-slate-950">{story.title}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">{node.text}</p>
          {node.end ? (
            <button type="button" className="btn-primary mt-5" onClick={finishStory}>
              Finish story
            </button>
          ) : (
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {node.choices.map((choice) => (
                <button
                  key={choice.label}
                  type="button"
                  className="story-choice"
                  onClick={() => setNodeId(choice.next)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          )}
        </article>
      </section>

      {customPrompts.length ? (
        <section className="mt-4 rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
          <h2 className="panel-title">Family story prompts</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {customPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="story-choice text-left"
                onClick={() => completeCustomPrompt(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
