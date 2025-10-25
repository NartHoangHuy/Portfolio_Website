import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import axios from 'axios'
import './Projects.css'

const Projects = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const response = await axios.get('/api/projects')
            setProjects(response.data)
        } catch (error) {
            console.error('Error fetching projects:', error)
            // Fallback to demo data
            setProjects(demoProjects)
        } finally {
            setLoading(false)
        }
    }

    const demoProjects = [
        {
            id: 1,
            title: 'BLOOD-BRIDGE',
            description: 'Website connecting blood donors and recipients for life-saving donations.',
            image: 'https://via.placeholder.com/400x250/6366f1/ffffff?text=E-Commerce',
            technologies: ['React', 'Node.js', 'MongoDB', 'Javascript'],
            category: 'fullstack',
            githubUrl: 'https://github.com/NartHoangHuy/BLOOD-BRIDGE',
            liveUrl: 'https://example.com'
        },
        {
            id: 2,
            title: 'Real-Time Chat Application',
            description: 'Flutter application with firebase real-time database for instant messaging and media sharing.',
            image: 'https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Chat+App',
            technologies: ['Dart', 'Python', 'Firebase', 'MySQL'],
            category: 'backend',
            githubUrl: 'https://github.com/NartHoangHuy/APP_HENHO',
            liveUrl: 'https://example.com'
        },
        {
            id: 3,
            title: 'Predict Stock Prices',
            description: 'Machine learning project to predict stock prices using historical data and various algorithms.',
            image: 'https://via.placeholder.com/400x250/ec4899/ffffff?text=Task+Manager',
            technologies: ['Python', 'Firebase'],
            category: 'fullstack',
            githubUrl: 'https://github.com',
            liveUrl: 'https://example.com'
        },
        // {
        //     id: 4,
        //     title: 'Weather Dashboard',
        //     description: 'Interactive weather dashboard with real-time data, forecasts, and beautiful data visualizations.',
        //     image: 'https://via.placeholder.com/400x250/10b981/ffffff?text=Weather+App',
        //     technologies: ['React', 'Chart.js', 'OpenWeather API'],
        //     category: 'frontend',
        //     githubUrl: 'https://github.com',
        //     liveUrl: 'https://example.com'
        // },
        // {
        //     id: 5,
        //     title: 'Blog Platform API',
        //     description: 'RESTful API for a blogging platform with authentication, CRUD operations, and content management.',
        //     image: 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=Blog+API',
        //     technologies: ['Go', 'Gin', 'PostgreSQL', 'JWT'],
        //     category: 'backend',
        //     githubUrl: 'https://github.com',
        //     liveUrl: null
        // },
        {
            id: 6,
            title: 'Portfolio Website',
            description: 'Modern portfolio website with animations, responsive design, and contact form integration.',
            image: 'https://via.placeholder.com/400x250/6366f1/ffffff?text=Portfolio',
            technologies: ['React', 'Framer Motion', 'CSS'],
            category: 'frontend',
            githubUrl: 'https://github.com',
            liveUrl: 'https://example.com'
        }
    ]

    const categories = ['all', 'fullstack', 'frontend', 'backend']

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter)

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">My Projects</h2>
                    <p className="section-subtitle">Things I've built</p>

                    <div className="filter-buttons">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="loading">Loading projects...</div>
                    ) : (
                        <div className="projects-grid">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    className="project-card card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="project-image">
                                        <img src={project.image} alt={project.title} />
                                        <div className="project-overlay">
                                            <div className="project-links">
                                                {project.githubUrl && (
                                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                        <FaGithub />
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                        <FaExternalLinkAlt />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-content">
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                        <div className="project-tech">
                                            {project.technologies.map((tech) => (
                                                <span key={tech} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}

export default Projects
