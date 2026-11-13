import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('skillsphere-user')) } catch { return null }
  })

  const login = (data) => {
    setUser(data)
    localStorage.setItem('skillsphere-user', JSON.stringify(data))
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem('skillsphere-user')
  }
  const value = useMemo(() => ({ user, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
