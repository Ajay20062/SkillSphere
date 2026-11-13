import { ArrowUpRight, Clock3, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function QuizCard({ quiz, index = 0 }) {
  const colors = ['violet', 'blue', 'orange', 'green']
  return <article className="quiz-card">
    <div className={`quiz-icon ${colors[index % colors.length]}`}><HelpCircle size={21}/></div>
    <span className="category">{quiz.category || 'General'}</span>
    <h3>{quiz.title}</h3>
    <p>{quiz.description || 'Test your knowledge and improve your skills.'}</p>
    <div className="quiz-meta"><span><Clock3 size={14}/> {quiz.durationMinutes} min</span><span>{quiz.questions?.length ?? '—'} questions</span></div>
    <Link className="card-action" to={`/quiz/${quiz.id}`}>Start learning <ArrowUpRight size={16}/></Link>
  </article>
}
