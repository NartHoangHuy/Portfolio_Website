package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Project struct {
	ID           int      `json:"id"`
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Image        string   `json:"image"`
	Technologies []string `json:"technologies"`
	Category     string   `json:"category"`
	GithubURL    string   `json:"githubUrl"`
	LiveURL      string   `json:"liveUrl,omitempty"`
}

type BlogPost struct {
	ID       int    `json:"id"`
	Title    string `json:"title"`
	Excerpt  string `json:"excerpt"`
	Content  string `json:"content,omitempty"`
	Date     string `json:"date"`
	ReadTime string `json:"readTime"`
	Category string `json:"category"`
	Image    string `json:"image"`
	Author   string `json:"author"`
}

type ContactMessage struct {
	Name    string `json:"name" binding:"required"`
	Email   string `json:"email" binding:"required,email"`
	Subject string `json:"subject" binding:"required"`
	Message string `json:"message" binding:"required"`
}

var projects = []Project{
	{
		ID:           1,
		Title:        "E-Commerce Platform",
		Description:  "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
		Image:        "https://via.placeholder.com/400x250/6366f1/ffffff?text=E-Commerce",
		Technologies: []string{"React", "Node.js", "MongoDB", "Stripe"},
		Category:     "fullstack",
		GithubURL:    "https://github.com",
		LiveURL:      "https://example.com",
	},
	{
		ID:           2,
		Title:        "Real-Time Chat Application",
		Description:  "WebSocket-based chat application with rooms, private messaging, and file sharing capabilities.",
		Image:        "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Chat+App",
		Technologies: []string{"React", "Go", "WebSocket", "Redis"},
		Category:     "fullstack",
		GithubURL:    "https://github.com",
		LiveURL:      "https://example.com",
	},
	{
		ID:           3,
		Title:        "Task Management System",
		Description:  "Agile project management tool with Kanban boards, sprint planning, and team collaboration features.",
		Image:        "https://via.placeholder.com/400x250/ec4899/ffffff?text=Task+Manager",
		Technologies: []string{"React", "TypeScript", "Go", "PostgreSQL"},
		Category:     "fullstack",
		GithubURL:    "https://github.com",
		LiveURL:      "https://example.com",
	},
	{
		ID:           4,
		Title:        "Weather Dashboard",
		Description:  "Interactive weather dashboard with real-time data, forecasts, and beautiful data visualizations.",
		Image:        "https://via.placeholder.com/400x250/10b981/ffffff?text=Weather+App",
		Technologies: []string{"React", "Chart.js", "OpenWeather API"},
		Category:     "frontend",
		GithubURL:    "https://github.com",
		LiveURL:      "https://example.com",
	},
	{
		ID:           5,
		Title:        "Blog Platform API",
		Description:  "RESTful API for a blogging platform with authentication, CRUD operations, and content management.",
		Image:        "https://via.placeholder.com/400x250/f59e0b/ffffff?text=Blog+API",
		Technologies: []string{"Go", "Gin", "PostgreSQL", "JWT"},
		Category:     "backend",
		GithubURL:    "https://github.com",
	},
	{
		ID:           6,
		Title:        "Portfolio Website",
		Description:  "Modern portfolio website with animations, responsive design, and contact form integration.",
		Image:        "https://via.placeholder.com/400x250/6366f1/ffffff?text=Portfolio",
		Technologies: []string{"React", "Framer Motion", "CSS"},
		Category:     "frontend",
		GithubURL:    "https://github.com",
		LiveURL:      "https://example.com",
	},
}

var blogPosts = []BlogPost{
	{
		ID:       1,
		Title:    "Building Scalable APIs with Go and Gin",
		Excerpt:  "Learn how to build high-performance RESTful APIs using Go and the Gin framework. This guide covers routing, middleware, and best practices.",
		Content:  "<h2>Introduction</h2><p>In this comprehensive guide, we'll explore how to build high-performance RESTful APIs using Go and the Gin framework.</p><h2>Why Go and Gin?</h2><p>Go (Golang) is known for its exceptional performance, simplicity, and built-in concurrency support.</p>",
		Date:     "2024-01-15",
		ReadTime: "8 min read",
		Category: "Backend",
		Image:    "https://via.placeholder.com/600x300/6366f1/ffffff?text=Go+API",
		Author:   "Your Name",
	},
	{
		ID:       2,
		Title:    "React Performance Optimization Techniques",
		Excerpt:  "Discover essential techniques to optimize your React applications including memoization, code splitting, and lazy loading.",
		Content:  "<h2>Introduction</h2><p>React performance optimization is crucial for building fast and responsive applications.</p>",
		Date:     "2024-01-10",
		ReadTime: "6 min read",
		Category: "Frontend",
		Image:    "https://via.placeholder.com/600x300/8b5cf6/ffffff?text=React+Performance",
		Author:   "Your Name",
	},
	{
		ID:       3,
		Title:    "Microservices Architecture with Docker",
		Excerpt:  "A comprehensive guide to designing and deploying microservices using Docker containers and orchestration tools.",
		Content:  "<h2>Introduction</h2><p>Microservices architecture has become the standard for building scalable applications.</p>",
		Date:     "2024-01-05",
		ReadTime: "10 min read",
		Category: "DevOps",
		Image:    "https://via.placeholder.com/600x300/ec4899/ffffff?text=Microservices",
		Author:   "Your Name",
	},
}

func main() {
	router := gin.Default()

	// CORS configuration
	config := cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	router.Use(cors.New(config))

	// API routes
	api := router.Group("/api")
	{
		// Projects endpoints
		api.GET("/projects", getProjects)
		api.GET("/projects/:id", getProjectByID)

		// Blog endpoints
		api.GET("/blog", getBlogPosts)
		api.GET("/blog/:id", getBlogPostByID)

		// Contact endpoint
		api.POST("/contact", sendContactMessage)
	}

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"message": "Server is running",
		})
	})

	router.Run(":8080")
}

func getProjects(c *gin.Context) {
	c.JSON(http.StatusOK, projects)
}

func getProjectByID(c *gin.Context) {
	id := c.Param("id")

	for _, project := range projects {
		if string(rune(project.ID)) == id {
			c.JSON(http.StatusOK, project)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
}

func getBlogPosts(c *gin.Context) {
	c.JSON(http.StatusOK, blogPosts)
}

func getBlogPostByID(c *gin.Context) {
	id := c.Param("id")

	for _, post := range blogPosts {
		if string(rune(post.ID)) == id {
			c.JSON(http.StatusOK, post)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Blog post not found"})
}

func sendContactMessage(c *gin.Context) {
	var message ContactMessage

	if err := c.ShouldBindJSON(&message); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Here you would typically:
	// 1. Save to database
	// 2. Send email notification
	// 3. Send confirmation email to user

	// For now, just log and return success
	gin.Logger()
	c.JSON(http.StatusOK, gin.H{
		"message": "Thank you for your message! We'll get back to you soon.",
		"data":    message,
	})
}
