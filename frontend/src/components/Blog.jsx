import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaClock, FaArrowRight } from 'react-icons/fa'
import axios from 'axios'
import './Blog.css'

const Blog = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/blog')
            setPosts(response.data)
        } catch (error) {
            console.error('Error fetching blog posts:', error)
            // Fallback to demo data
            setPosts(demoPosts)
        } finally {
            setLoading(false)
        }
    }

    const demoPosts = [
        {
            id: 1,
            title: 'Building Scalable APIs with Go and Gin',
            excerpt: 'Learn how to build high-performance RESTful APIs using Go and the Gin framework. This guide covers routing, middleware, and best practices.',
            date: '2024-01-15',
            readTime: '8 min read',
            category: 'Backend',
            image: 'https://via.placeholder.com/600x300/6366f1/ffffff?text=Go+API'
        },
        {
            id: 2,
            title: 'React Performance Optimization Techniques',
            excerpt: 'Discover essential techniques to optimize your React applications including memoization, code splitting, and lazy loading.',
            date: '2024-01-10',
            readTime: '6 min read',
            category: 'Frontend',
            image: 'https://via.placeholder.com/600x300/8b5cf6/ffffff?text=React+Performance'
        },
        {
            id: 3,
            title: 'Microservices Architecture with Docker',
            excerpt: 'A comprehensive guide to designing and deploying microservices using Docker containers and orchestration tools.',
            date: '2024-01-05',
            readTime: '10 min read',
            category: 'DevOps',
            image: 'https://via.placeholder.com/600x300/ec4899/ffffff?text=Microservices'
        }
    ]

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    return (
        <section id="blog" className="section blog-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">My Blog</h2>
                    <p className="section-subtitle">Thoughts, tutorials, and insights</p>

                    {loading ? (
                        <div className="loading">Loading posts...</div>
                    ) : (
                        <div className="blog-grid">
                            {posts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    className="blog-card card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="blog-image">
                                        <img src={post.image} alt={post.title} />
                                        <span className="blog-category">{post.category}</span>
                                    </div>
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <span>{formatDate(post.date)}</span>
                                            <span className="blog-time">
                                                <FaClock /> {post.readTime}
                                            </span>
                                        </div>
                                        <h3>{post.title}</h3>
                                        <p>{post.excerpt}</p>
                                        <Link to={`/blog/${post.id}`} className="read-more">
                                            Read More <FaArrowRight />
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}

export default Blog
