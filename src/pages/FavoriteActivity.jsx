import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import FavoritePicture from '../components/FavoritePicture'
import PageHeader from '../components/PageHeader'
import { favoriteLearningActivities } from '../data/content'
import { useAppState } from '../hooks/useAppState'

export default function FavoriteActivity() {
  const { id } = useParams()
  const { awardStars, settings } = useAppState()
  const activity = favoriteLearningActivities.find((item) => item.id === id)
  const isParentMode = settings.audienceMode === 'parent'
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [completed, setCompleted] = useState(false)

  if (!activity) {
    return <Navigate to="/" replace />
  }

  const choose = (choice) => {
    setSelectedChoice(choice)
    setCompleted(false)
  }

  const finish = () => {
    if (completed) return
    setCompleted(true)
    awardStars(1, `${activity.title} activity finished.`)
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
          <p className="label-text">Choose one</p>
          <div className="mt-3 grid gap-2">
            {activity.choices.map((choice) => (
              <button
                key={choice.label}
                type="button"
                className={`choice-chip ${
                  selectedChoice?.label === choice.label ? 'selected' : ''
                }`}
                onClick={() => choose(choice)}
              >
                {choice.label}
              </button>
            ))}
          </div>

          {selectedChoice ? (
            <div className="favorite-feedback" role="status">
              <p className="text-sm font-black uppercase text-emerald-700">
                You chose
              </p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">
                {selectedChoice.label}
              </h2>
              <p className="mt-2 leading-7 text-slate-700">
                {selectedChoice.feedback}
              </p>
              <p className="mt-3 rounded-lg bg-sky-50 p-3 text-sm font-bold leading-6 text-slate-700">
                Away from the screen: {activity.bridge}
              </p>
              <button type="button" className="btn-primary mt-4 w-full" onClick={finish}>
                I did it
              </button>
            </div>
          ) : (
            <div className="favorite-feedback quiet">
              <p>Tap a big choice to start this little activity.</p>
            </div>
          )}

          {completed ? (
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
