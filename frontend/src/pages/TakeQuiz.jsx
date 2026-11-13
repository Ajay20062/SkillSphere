import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock3, Send } from 'lucide-react'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'

export default function TakeQuiz() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [quiz,setQuiz] = useState(null)
  const [answers,setAnswers] = useState({})
  const [index,setIndex] = useState(0)
  const [error,setError] = useState('')
  const [busy,setBusy] = useState(false)
  useEffect(() => { api.quiz(id).then(setQuiz).catch(e => setError(e.message)) }, [id])

  async function finish() {
    setBusy(true); setError('')
    try {
      const result = await api.submitAttempt({
        userId: user.id, quizId: Number(id),
        answers: Object.entries(answers).map(([questionId,selectedOption]) => ({ questionId: Number(questionId), selectedOption }))
      })
      const payload = { ...result, quizTitle: quiz.title }
      localStorage.setItem('skillsphere-result', JSON.stringify(payload))
      navigate('/result', { state: payload })
    } catch(e) { setError(e.message); setBusy(false) }
  }
  if (error && !quiz) return <div className="error-msg">{error}</div>
  if (!quiz) return <div className="loading">Loading your quiz…</div>
  const questions = quiz.questions || []
  const question = questions[index]
  if (!question) return <div className="empty-state">This quiz has no questions yet.</div>
  const options = [['A',question.optionA],['B',question.optionB],['C',question.optionC],['D',question.optionD]]
  return <div className="quiz-take-wrap">
    <button className="back-btn" onClick={() => navigate('/quizzes')}><ArrowLeft size={16}/> Back to quizzes</button>
    <div className="quiz-take-head"><div><span className="eyebrow">{quiz.category}</span><h1>{quiz.title}</h1><p className="muted">{quiz.description}</p></div><div className="timer-pill"><Clock3 size={16}/> {quiz.durationMinutes} min</div></div>
    <div className="progress-line"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div>
    <div className="question-card"><div className="question-meta"><span>QUESTION {index+1} OF {questions.length}</span><span>{Object.keys(answers).length} answered</span></div>
      <h2>{question.questionText}</h2>
      <div className="options-list">{options.map(([key,value]) => <button key={key} className={`option ${answers[question.id] === key ? 'selected' : ''}`} onClick={() => setAnswers({...answers,[question.id]:key})}><span className="option-key">{key}</span><span>{value}</span><span className="option-radio"/></button>)}</div>
      {error && <div className="error-msg">{error}</div>}
      <div className="question-footer"><span className="muted">Your progress is saved when you submit.</span><div className="button-row">
        {index > 0 && <button className="secondary-btn" onClick={() => setIndex(index-1)}>Previous</button>}
        {index < questions.length-1 ? <button className="primary-btn" onClick={() => setIndex(index+1)}>Next <ArrowRight size={16}/></button> : <button className="primary-btn" disabled={busy} onClick={finish}>{busy ? 'Submitting…' : 'Submit quiz'} <Send size={16}/></button>}
      </div></div>
    </div>
  </div>
}
