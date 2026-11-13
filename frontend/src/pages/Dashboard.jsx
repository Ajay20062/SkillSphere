import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, BookOpen, Flame, Target, Trophy, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'
import QuizCard from '../components/QuizCard'

export default function Dashboard() {
  const { user } = useAuth()
  const [quizzes, setQuizzes] = useState([])
  const [history, setHistory] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    Promise.all([api.quizzes(), api.history(user.id)])
      .then(([q,h]) => { setQuizzes(q); setHistory(h) })
      .catch(e => setError(e.message))
  }, [user.id])
  const average = useMemo(() => history.length ? Math.round(history.reduce((s,a) => s + a.score / Math.max(a.totalQuestions,1) * 100, 0) / history.length) : 0, [history])
  const completed = history.length
  return <div>
    <div className="welcome-row"><div><span className="eyebrow">YOUR PERSONAL LEARNING SPACE</span><h1>Hey, {user.name.split(' ')[0]} <span className="wave">✦</span></h1><p className="muted">Ready to make today count? Keep your momentum going.</p></div><div className="date-pill"><Sparkles size={16}/> Small steps. Big progress.</div></div>
    {error && <div className="error-msg">{error}</div>}
    <section className="stats-grid">
      <div className="stat-card"><div className="stat-top"><span>Quizzes available</span><BookOpen size={18}/></div><strong>{quizzes.length}</strong><small>Ready when you are</small></div>
      <div className="stat-card"><div className="stat-top"><span>Attempts completed</span><Target size={18}/></div><strong>{completed}</strong><small>Your practice history</small></div>
      <div className="stat-card"><div className="stat-top"><span>Average score</span><Trophy size={18}/></div><strong>{average}%</strong><small>{completed ? 'Keep improving' : 'Your first score awaits'}</small></div>
      <div className="stat-card"><div className="stat-top"><span>Learning streak</span><Flame size={18}/></div><strong>{completed ? '1 day' : '0 days'}</strong><small>Practice regularly</small></div>
    </section>
    <div className="section-heading"><div><span className="eyebrow">PICK UP A NEW SKILL</span><h2>Explore quizzes</h2></div><Link to="/quizzes" className="text-link">View all <ArrowUpRight size={16}/></Link></div>
    <div className="quiz-grid">{quizzes.slice(0,3).map((q,i) => <QuizCard key={q.id} quiz={q} index={i}/>)}</div>
    <section className="bottom-banner"><div className="banner-symbol"><Trophy size={26}/></div><div><h3>Progress is built one challenge at a time.</h3><p>Take another quiz and move closer to your goals.</p></div><Link to="/leaderboard" className="banner-link">See leaderboard <ArrowUpRight size={16}/></Link></section>
  </div>
}
