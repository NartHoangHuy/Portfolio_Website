import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')

        if (token && userData) {
            setUser(JSON.parse(userData))
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        setLoading(false)
    }, [])

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password
            })

            const { token, user } = response.data

            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser(user)
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed'
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
        setUser(null)
    }

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
