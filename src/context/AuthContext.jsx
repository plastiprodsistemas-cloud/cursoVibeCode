import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../api/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    const sessionUser = localStorage.getItem('currentUser')
    if (sessionUser) {
      setUser(JSON.parse(sessionUser))
    }
    setLoading(false)
  }

  const login = async (email, password) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error) throw new Error('Usuario no encontrado')

    const passwordMatch = await verifyPassword(password, data.password_hash)
    if (!passwordMatch) throw new Error('Contraseña incorrecta')

    const userData = { id: data.id, username: data.username, email: data.email }
    setUser(userData)
    localStorage.setItem('currentUser', JSON.stringify(userData))
    return userData
  }

  const register = async (username, email, password) => {
    const existingUser = await supabase
      .from('users')
      .select('id')
      .or(`email.eq.${email},username.eq.${username}`)
      .single()

    if (existingUser.data) throw new Error('Usuario o email ya existe')

    const passwordHash = await hashPassword(password)

    const { data, error } = await supabase
      .from('users')
      .insert([{ username, email, password_hash: passwordHash }])
      .select()
      .single()

    if (error) throw error

    const userData = { id: data.id, username: data.username, email: data.email }
    setUser(userData)
    localStorage.setItem('currentUser', JSON.stringify(userData))
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  const hashPassword = async (password) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hash = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  const verifyPassword = async (password, hash) => {
    const passwordHash = await hashPassword(password)
    return passwordHash === hash
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)