import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa'
import axios from 'axios'
import './AdminDashboard.css'

const AdminDashboard = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('projects')
    const [projects, setProjects] = useState([])
    const [blogPosts, setBlogPosts] = useState([])
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [activeTab])

    const fetchData = async () => {
        setLoading(true)
        try {
            if (activeTab === 'projects') {
                const response = await axios.get('/api/projects')
                setProjects(response.data)
            } else if (activeTab === 'blog') {
                const response = await axios.get('/api/blog')
                setBlogPosts(response.data)
            } else if (activeTab === 'contacts') {
                const response = await axios.get('/api/admin/contacts')
                setContacts(response.data)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
        setLoading(false)
    }

    const handleLogout = () => {
        logout()
        navigate('/admin/login')
    }

    const handleDelete = async (type, id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return

        try {
            await axios.delete(`/api/admin/${type}/${id}`)
            fetchData()
        } catch (error) {
            alert('Error deleting item')
        }
    }

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                    <p>Welcome, {user?.username}</p>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={activeTab === 'projects' ? 'active' : ''}
                        onClick={() => setActiveTab('projects')}
                    >
                        Projects
                    </button>
                    <button
                        className={activeTab === 'blog' ? 'active' : ''}
                        onClick={() => setActiveTab('blog')}
                    >
                        Blog Posts
                    </button>
                    <button
                        className={activeTab === 'contacts' ? 'active' : ''}
                        onClick={() => setActiveTab('contacts')}
                    >
                        Contact Messages
                    </button>
                </nav>

                <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                </button>
            </aside>

            <main className="admin-content">
                <div className="content-header">
                    <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                    {activeTab !== 'contacts' && (
                        <button className="btn btn-primary">
                            <FaPlus /> Add New
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="data-table">
                        {activeTab === 'projects' && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Technologies</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.id}>
                                            <td>{project.title}</td>
                                            <td>{project.category}</td>
                                            <td>{project.technologies?.join(', ')}</td>
                                            <td>
                                                <button className="btn-icon edit">
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn-icon delete"
                                                    onClick={() => handleDelete('projects', project.id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {activeTab === 'blog' && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Published</th>
                                        <th>Views</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogPosts.map((post) => (
                                        <tr key={post.id}>
                                            <td>{post.title}</td>
                                            <td>{post.category}</td>
                                            <td>{post.published ? 'Yes' : 'No'}</td>
                                            <td>{post.views || 0}</td>
                                            <td>
                                                <button className="btn-icon edit">
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn-icon delete"
                                                    onClick={() => handleDelete('blog', post.id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {activeTab === 'contacts' && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map((contact) => (
                                        <tr key={contact.id} className={contact.read ? 'read' : 'unread'}>
                                            <td>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.subject}</td>
                                            <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    className="btn-icon delete"
                                                    onClick={() => handleDelete('contacts', contact.id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}

export default AdminDashboard
