import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BookOpen, LayoutDashboard, Trophy, History, UserRound, LogOut, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const links = [
    { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/quizzes', label: 'Explore quizzes', icon: BookOpen },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { to: '/history', label: 'My attempts', icon: History },
    { to: '/profile', label: 'My profile', icon: UserRound }
  ]
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><Sparkles size={19}/></span><span>Skill<span className="accent">Sphere</span></span></div>
      <div className="side-label">WORKSPACE</div>
      <nav>{links.map(({to,label,icon:Icon,end}) =>
        <NavLink key={to} to={to} end={end} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
          <Icon size={18}/><span>{label}</span>
        </NavLink>)}</nav>
      <div className="sidebar-bottom">
        <div className="mini-user"><div className="avatar">{user?.name?.[0]?.toUpperCase() || 'S'}</div><div><b>{user?.name || 'Student'}</b><small>Learning account</small></div></div>
        <button className="logout" onClick={() => { logout(); navigate('/login') }}><LogOut size={17}/> Sign out</button>
      </div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="mobile-brand">Skill<span className="accent">Sphere</span></div><span className="top-note">Your learning journey, in one place</span><div className="top-user"><span className="online-dot"/> {user?.name}</div></header>
      <div className="page-wrap"><Outlet/></div>
    </main>
  </div>
}
