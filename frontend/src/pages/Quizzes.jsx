import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { api } from '../api'
import QuizCard from '../components/QuizCard'

export default function Quizzes() {
  const [quizzes,setQuizzes] = useState([])
  const [query,setQuery] = useState('')
  const [error,setError] = useState('')
  useEffect(() => { api.quizzes().then(setQuizzes).catch(e => setError(e.message)) }, [])
  const filtered = quizzes.filter(q => `${q.title} ${q.category} ${q.description}`.toLowerCase().includes(query.toLowerCase()))
  return <div><div className="page-heading"><span className="eyebrow">LEARN SOMETHING NEW</span><h1>Explore quizzes</h1><p className="muted">Choose a topic, test your knowledge, and grow your confidence.</p></div>
    <div className="search-box"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search quizzes or categories…"/></div>
    {error && <div className="error-msg">{error}</div>}
    <div className="quiz-grid">{filtered.map((q,i) => <QuizCard key={q.id} quiz={q} index={i}/>)}</div>
    {!filtered.length && <div className="empty-state">No quizzes found. Try another search.</div>}
  </div>
}
