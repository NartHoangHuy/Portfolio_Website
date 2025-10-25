import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AdminLogin.css'

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await login(credentials.username, credentials.password)

        if (result.success) {
            navigate('/admin/dashboard')
        } else {
            setError(result.error)
        }

        setLoading(false)
    }

    return (
        <div className="admin-login">
            <div className="login-container">
                <h1>Admin Login</h1>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
