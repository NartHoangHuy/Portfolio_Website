import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaArrowLeft, FaClock, FaCalendar } from 'react-icons/fa'
import axios from 'axios'
import './BlogPost.css'

const BlogPost = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPost()
    }, [id])

    const fetchPost = async () => {
        try {
            const response = await axios.get(`/api/blog/${id}`)
            setPost(response.data)
        } catch (error) {
            console.error('Error fetching post:', error)
            // Fallback to demo data
            setPost(demoPost)
        } finally {
            setLoading(false)
        }
    }

    const demoPost = {
        id: 1,
        title: 'Building Scalable APIs with Go and Gin',
        content: `
      <h2>Introduction</h2>
      <p>In this comprehensive guide, we'll explore how to build high-performance RESTful APIs using Go and the Gin framework.</p>
      
      <h2>Why Go and Gin?</h2>
      <p>Go (Golang) is known for its exceptional performance, simplicity, and built-in concurrency support. Combined with Gin, one of the fastest web frameworks available, you can build APIs that handle thousands of requests per second.</p>
      
      <h2>Getting Started</h2>
      <p>First, let's set up our project structure and install the necessary dependencies...</p>
      
      <h2>Best Practices</h2>
      <p>When building APIs with Go and Gin, consider these best practices:</p>
      <ul>
        <li>Use middleware for cross-cutting concerns</li>
        <li>Implement proper error handling</li>
        <li>Structure your code with clean architecture</li>
        <li>Use environment variables for configuration</li>
      </ul>
    `,
        date: '2024-01-15',
        readTime: '8 min read',
        category: 'Backend',
        image: 'https://via.placeholder.com/1200x500/6366f1/ffffff?text=Go+API',
        author: 'Your Name'
    }

    if (loading) {
        return <div className="loading-post">Loading post...</div>
    }

    if (!post) {
        return <div className="not-found">Post not found</div>
    }

    return (
        <article className="blog-post">
            <div className="post-header">
                <img src={post.image} alt={post.title} className="post-header-image" />
                <div className="post-header-overlay">
                    <div className="container">
                        <Link to="/#blog" className="back-link">
                            <FaArrowLeft /> Back to Blog
                        </Link>
                        <h1>{post.title}</h1>
                        <div className="post-meta">
                            <span className="post-category">{post.category}</span>
                            <span><FaCalendar /> {new Date(post.date).toLocaleDateString()}</span>
                            <span><FaClock /> {post.readTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="post-content">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </div>
        </article>
    )
}

export default BlogPost
