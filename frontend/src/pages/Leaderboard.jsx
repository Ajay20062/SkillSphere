import { useEffect, useState } from 'react'
import { Trophy, Medal } from 'lucide-react'
import { api } from '../api'

export default function Leaderboard() {
  const [rows,setRows] = useState([])
  const [error,setError] = useState('')
  useEffect(() => { api.leaderboard().then(setRows).catch(e => setError(e.message)) }, [])
  return <div><div className="page-heading"><span className="eyebrow">CELEBRATE THE EFFORT</span><h1>Leaderboard</h1><p className="muted">A little friendly competition makes learning more fun.</p></div>
    {error && <div className="error-msg">{error}</div>}
    <div className="table-card"><div className="table-title"><Trophy size={20}/> Top learners</div>
      <div className="table-scroll"><table><thead><tr><th>RANK</th><th>STUDENT</th><th>QUIZ</th><th>SCORE</th></tr></thead>
      <tbody>{rows.map((r,i) => <tr key={r.id}><td><span className={`rank rank-${i+1}`}>{i<3 ? <Medal size={16}/> : `#${i+1}`}</span></td><td><b>{r.studentName}</b></td><td>{r.quizTitle}</td><td><strong>{r.score}/{r.totalQuestions}</strong></td></tr>)}</tbody></table></div>
      {!rows.length && <div className="empty-state">No attempts yet. Be the first to take a quiz!</div>}
    </div>
  </div>
}
