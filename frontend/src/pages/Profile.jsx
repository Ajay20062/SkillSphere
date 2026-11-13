import { UserRound, Mail, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  return <div><div className="page-heading"><span className="eyebrow">YOUR SPACE</span><h1>My profile</h1><p className="muted">Your SkillSphere account information.</p></div>
    <div className="profile-card"><div className="profile-avatar">{user.name?.[0]?.toUpperCase()}</div><h2>{user.name}</h2><p className="muted">SkillSphere learner</p>
      <div className="profile-info"><div><UserRound size={18}/><span><small>Full name</small><b>{user.name}</b></span></div><div><Mail size={18}/><span><small>Email address</small><b>{user.email}</b></span></div><div><ShieldCheck size={18}/><span><small>Account type</small><b>Student</b></span></div></div>
    </div>
  </div>
}
