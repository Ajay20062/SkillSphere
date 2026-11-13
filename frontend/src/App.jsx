import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Quizzes from './pages/Quizzes'
import TakeQuiz from './pages/TakeQuiz'
import Result from './pages/Result'
import Leaderboard from './pages/Leaderboard'
import HistoryPage from './pages/History'
import Profile from './pages/Profile'

function Protected({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace/>
}
function AppRoutes() {
  return <Routes>
    <Route path="/login" element={<Auth mode="login"/>}/>
    <Route path="/register" element={<Auth mode="register"/>}/>
    <Route element={<Protected><Layout/></Protected>}>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/quizzes" element={<Quizzes/>}/>
      <Route path="/quiz/:id" element={<TakeQuiz/>}/>
      <Route path="/result" element={<Result/>}/>
      <Route path="/leaderboard" element={<Leaderboard/>}/>
      <Route path="/history" element={<HistoryPage/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Route>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>
}
export default function App() {
  return <AuthProvider><AppRoutes/></AuthProvider>
}
