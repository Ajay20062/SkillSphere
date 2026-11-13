import { useEffect, useState } from 'react'
import { History as HistoryIcon } from 'lucide-react'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'

export default function HistoryPage() {
  const { user } = useAuth()
  const [rows,setRows] = useState([])
  const [error,setError] = useState('')
  useEffect(() => { api.history(user.id).then(setRows).catch(e => setError(e.message)) }, [user.id])
  return <div><div className="page-heading"><span className="eyebrow">YOUR LEARNING JOURNEY</span><h1>My attempts</h1><p className="muted">Look back at what you have practiced and how you are improving.</p></div>
    {error && <div className="error-msg">{error}</div>}
    <div className="table-card"><div className="table-title"><HistoryIcon size={20}/> Recent activity</div><div className="table-scroll"><table><thead><tr><th>QUIZ</th><th>SCORE</th><th>PERCENTAGE</th><th>DATE</th></tr></thead><tbody>
      {rows.map(r => <tr key={r.id}><td><b>{r.quizTitle}</b></td><td>{r.score}/{r.totalQuestions}</td><td><span className="percentage-chip">{Math.round(r.score/Math.max(r.totalQuestions,1)*100)}%</span></td><td>{r.attemptedAt ? new Date(r.attemptedAt).toLocaleString() : '—'}</td></tr>)}
    </tbody></table></div>{!rows.length && <div className="empty-state">Your completed quizzes will appear here.</div>}</div>
  </div>
}
