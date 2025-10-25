import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
            }}>
                Loading...
            </div>
        )
    }

    return isAuthenticated ? children : <Navigate to="/admin/login" />
}

export default ProtectedRoute
