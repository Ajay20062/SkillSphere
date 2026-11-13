import { Link, useLocation } from 'react-router-dom'
import { Award, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Result() {
  const { state } = useLocation()
  if (!state) return <div className="empty-state">No result to show. <Link to="/quizzes">Take a quiz</Link>.</div>
  const good = state.percentage >= 70
  return <div className="result-wrap"><div className="result-card">
    <div className="result-icon"><Award size={34}/></div><span className="eyebrow">QUIZ COMPLETED</span><h1>{good ? 'Great work!' : 'Keep practicing!'}</h1><p className="muted">{state.quizTitle}</p>
    <div className="score-circle"><strong>{state.percentage}%</strong><span>YOUR SCORE</span></div>
    <div className="result-details"><div><b>{state.score}/{state.totalQuestions}</b><small>Correct answers</small></div><div><b>{state.totalQuestions-state.score}</b><small>Need more practice</small></div></div>
    <div className="success-note"><CheckCircle2 size={17}/> Your attempt has been saved.</div>
    <Link className="primary-btn" to="/">Back to dashboard <ArrowRight size={16}/></Link>
  </div></div>
}
