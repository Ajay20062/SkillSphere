import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Auth({ mode }) {
  const isRegister = mode === 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const update = e => setForm({ ...form, [e.target.name]: e.target.value })
  async function submit(e) {
    e.preventDefault(); setError(''); setBusy(true)
    try {
      const data = await (isRegister ? api.register(form) : api.login(form))
      login(data); navigate('/')
    } catch (err) { setError(err.message) }
    finally { setBusy(false) }
  }

  return <div className="auth-page">
    <div className="auth-art"><div className="brand"><span className="brand-mark"><Sparkles size={19}/></span>Skill<span className="accent">Sphere</span></div>
      <div className="art-copy"><span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span><h1>Make learning<br/><span className="gradient-text">your superpower.</span></h1><p>Build skills, take on challenges, and celebrate every milestone along the way.</p>
        <div className="art-stats"><div><b>Learn</b><small>at your pace</small></div><div><b>Practice</b><small>every day</small></div><div><b>Achieve</b><small>your goals</small></div></div>
      </div><div className="orb orb-one"/><div className="orb orb-two"/>
    </div>
    <div className="auth-form-side"><form className="auth-form" onSubmit={submit}>
      <div className="form-icon"><Sparkles size={22}/></div><h2>{isRegister ? 'Create your account' : 'Welcome back'}</h2><p className="muted">{isRegister ? 'Start your learning journey today.' : 'Sign in to continue your progress.'}</p>
      {isRegister && <label>Full name<input name="name" value={form.name} onChange={update} placeholder="Your name" required/></label>}
      <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required/></label>
      <label>Password<input name="password" type="password" value={form.password} onChange={update} placeholder="At least 4 characters" minLength="4" required/></label>
      {error && <div className="error-msg">{error}</div>}
      <button className="primary-btn full" disabled={busy}>{busy ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'} <ArrowRight size={17}/></button>
      <p className="switch-auth">{isRegister ? 'Already have an account?' : "Don't have an account?"} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Create account'}</Link></p>
    </form></div>
  </div>
}
