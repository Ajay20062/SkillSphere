import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Award, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Result() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const storedResult = (() => {
    try {
      const raw = localStorage.getItem('skillsphere-result')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })()

  const result = state || storedResult

  const handleDashboard = () => {
    localStorage.removeItem('skillsphere-result')
    navigate('/')
  }

  if (!result) return <div className="empty-state">No result to show. <Link to="/quizzes">Take a quiz</Link>.</div>

  const good = result.percentage >= 70

  return <div className="result-wrap"><div className="result-card">
    <div className="result-icon"><Award size={34}/></div><span className="eyebrow">QUIZ COMPLETED</span><h1>{good ? 'Great work!' : 'Keep practicing!'}</h1><p className="muted">{result.quizTitle}</p>
    <div className="score-circle"><strong>{result.percentage}%</strong><span>YOUR SCORE</span></div>
    <div className="result-details"><div><b>{result.score}/{result.totalQuestions}</b><small>Correct answers</small></div><div><b>{result.totalQuestions-result.score}</b><small>Need more practice</small></div></div>
    <div className="success-note"><CheckCircle2 size={17}/> Your attempt has been saved.</div>
    <button className="primary-btn" onClick={handleDashboard}>Back to dashboard <ArrowRight size={16}/></button>
  </div></div>
}
